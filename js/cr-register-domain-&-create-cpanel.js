require('dotenv').config()
const axios = require('axios')
const { log } = require('console')
const sendEmail = require('./send-email')
const { assignPackageToUser } = require('./db')
const { t } = require('./config')

async function registerDomainAndCreateCpanel(send, domain, email, keyboardButtons, plan, username, state, chatId, successMessage, emailText = '') {
  const url = process.env.CPANEL_CREATE_ACCOUNT_URL
  let originalPlan = plan
  const payload = {
    telegramId: chatId,
    name: username,
    email: email,
    domain: domain,
    plan: plan,
  }
  const headers = {
    accept: 'application/json',
    'content-type': 'application/json',
    'x-api-key': process.env.CPANEL_API_KEY,
  }

  try {
    const response = await axios.post(url, payload, { headers })
    if (response.request.res.statusCode === 201) {
      send(chatId, successMessage(response.data.data.username, email, response.data.data.password, response.data.data.url), keyboardButtons)
      if (originalPlan === 'Freedom Plan') originalPlan = 'Free Trial Plan'
      await sendEmail(originalPlan, username, email, response.data.data.password, emailText, response.data.data.username, response.data.data.url)
      if (plan === 'Freedom Plan') return assignPackageToUser(state, chatId, plan, 12)
      return assignPackageToUser(state, chatId, plan)
    }
    return send(chatId, t.cPanelSupport, keyboardButtons)
  } catch (err) {
    const error = err?.message
    log('err registerDomain&CreateCPanel', { url, payload, headers }, err)
    return send(chatId, t.cPanelSupport, keyboardButtons)
  }
}

module.exports = { registerDomainAndCreateCpanel }