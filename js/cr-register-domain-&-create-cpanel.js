require('dotenv').config()
const axios = require('axios')
const { log } = require('console')
const sendEmail = require('./send-email')
const { assignPackageToUser, set, removeKeysFromDocumentById } = require('./db')
const { cPanelSupport, successText } = require('./hosting/plans')


const CPANEL_ENDPOINT = process.env.CPANEL_CREATE_ACCOUNT_URL
const CPANEL_API_KEY = process.env.CPANEL_API_KEY
const TELEGRAM_DEV_CHAT_ID = process.env.TELEGRAM_DEV_CHAT_ID

async function registerDomainAndCreateCpanel(send, info, keyboardButtons, state) {
  let headers, payload;
  try {
    headers = {
      accept: 'application/json',
      'content-type': 'application/json',
      'x-api-key': CPANEL_API_KEY,
    }

    payload = {
      telegramId: info._id,
      name: info.username,
      email: info.email,
      domain: info.website_name,
      existingDomain: info.existingDomain || false,
      plan: info.plan,
      nameserver: info.nameserver,
    }

    let response = await axios.post(CPANEL_ENDPOINT, payload, { headers })

    const statusCode = response.request.res.statusCode;

    if (statusCode === 201) {
      response = response.data.data

      send(info._id, successText(info, response), keyboardButtons)

      assignPackageToUser(state, info._id, info.plan)

      try {
        await sendEmail(info, response)
      } catch (error) {
        log('Error sending email:', error)
        send(TELEGRAM_DEV_CHAT_ID, 'Error sending email', keyboardButtons)
      }

      set(state, info._id, 'action', 'none')

      removeKeysFromDocumentById(state, info._id, [
        'plan',
        'existingDomain',
        'price',
        'domain',
        'website_name',
        'originalPrice',
        'continue_domain_last_state',
        'email',
        'couponDiscount',
        'hostingPrice',
        'couponApplied',
        'totalPrice',
        'newPrice',
      ])
    } else {
      return send(info._id, cPanelSupport(info.plan, statusCode), keyboardButtons)
    }
  } catch (err) {
    log('err registerDomain&CreateCPanel', { CPANEL_ENDPOINT, headers, payload }, err.data, err?.response?.data)
    return send(info._id, cPanelSupport(info.plan, 400), keyboardButtons)
  }
}

module.exports = { registerDomainAndCreateCpanel }
