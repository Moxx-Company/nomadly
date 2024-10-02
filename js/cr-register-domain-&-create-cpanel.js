require('dotenv').config()
const axios = require('axios')
const { log } = require('console')
const sendEmail = require('./send-email')
const { assignPackageToUser } = require('./db')
const { t } = require('./config')
const { cPanelSupport, planSuccessText, successEmailText } = require('./hosting/plans')

async function registerDomainAndCreateCpanel(send, info, keyboardButtons, state) {
  const url = process.env.CPANEL_CREATE_ACCOUNT_URL
  const payload = {
    telegramId: info._id+2,
    name: info.username,
    email: info.email,
    domain: info.website_name,
    existingDomain: info.existingDomain,
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
      send(info._id, planSuccessText(info.plan, response.username, info.email, response.password, response.url), keyboardButtons)

      let emailText = '';
      if (info.plan === 'Freedom Plan') {
        emailText = t.trialPlanEmailText;
        assignPackageToUser(state, info._id, info.plan, 12)
      } else {
        emailText = "";
        assignPackageToUser(state, info._id, info.plan)
      }
      await sendEmail(
        info.plan,
        info.username,
        info.email,
        response.username,
        response.password,
        response.url,
        emailText
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
