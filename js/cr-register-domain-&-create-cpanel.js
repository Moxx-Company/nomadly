require('dotenv').config()
const axios = require('axios')
const { log } = require('console')
const sendEmail = require('./send-email')
const { assignPackageToUser, set, removeKeysFromDocumentById } = require('./db')
const { t } = require('./config')
const { cPanelSupport, planSuccessText } = require('./hosting/plans')

async function registerDomainAndCreateCpanel(send, info, keyboardButtons, state) {
  const url = process.env.CPANEL_CREATE_ACCOUNT_URL
  const payload = {
    telegramId: info._id,
    name: info.username,
    email: info.email,
    domain: info.website_name,
    existingDomain: info.existingDomain || false,
    plan: info.plan,
  }
  const headers = {
    accept: 'application/json',
    'content-type': 'application/json',
    'x-api-key': process.env.CPANEL_API_KEY,
  }

  try {
    let response = await axios.post(url, payload, { headers })

    if (response.request.res.statusCode === 201) {
      response = response.data.data

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

      set(state, info._id, 'action', 'none')
      send(info._id, planSuccessText(info.plan, response.username, info.email, response.password, response.url), keyboardButtons)

      let emailText;
      if (info.plan === 'Freedom Plan') {
        emailText = t.trialPlanEmailText
        assignPackageToUser(state, info._id, info.plan, 12)
      } else {
        emailText = ''
        assignPackageToUser(state, info._id, info.plan)
      }
      await sendEmail(
        info.plan,
        info.username,
        info.email,
        response.username,
        response.password,
        response.url,
        emailText,
      )
    } else {
      return send(info._id, cPanelSupport(info.plan), keyboardButtons)
    }
  } catch (err) {
    log('err registerDomain&CreateCPanel', {url, payload, headers }, err.data, err?.response?.data)
    return send(info._id, cPanelSupport(info.plan), keyboardButtons)
  }
}

module.exports = { registerDomainAndCreateCpanel }
