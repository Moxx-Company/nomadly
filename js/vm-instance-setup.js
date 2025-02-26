require('dotenv').config()
const axios = require('axios')
const nodemailer = require('nodemailer')
require('dotenv').config()

const NAMEWORD_BASE_URL = process.env.NAMEWORD_BASE_URL
const X_API_KEY = process.env.NAMEWORD_API_KEY
const VM_PROJECT_ID = process.env.GOOGLE_CONSOLE_PROJECTID
const PERCENT_INCREASE_VPS = Number(process.env.VPS_PLAN_PRICE_INCREASE_PERC)

const headers = {
  accept: 'application/json',
  'content-type': 'application/json',
  'x-api-key': X_API_KEY,
}

const upgradeDiskOptions = [
  {
    currentName: '📀 Standard Persistent Disk',
    currentType: 'pd-standard',
    upgradeName: '⚖️ Balanced Persistent Disk',
    upgradeType: 'pd-balanced',
    pricePerMonth: 5,
  },
  {
    currentName: '📀 Standard Persistent Disk',
    currentType: 'pd-standard',
    upgradeName: '🚀 SSD Persistent Disk',
    upgradeType: 'pd-ssd',
    pricePerMonth: 15,
  },
  {
    currentName: '📀 Standard Persistent Disk',
    currentType: 'pd-standard',
    upgradeName: '🔥 Extreme Persistent Disk',
    upgradeType: 'pd-extreme',
    pricePerMonth: 30,
  },
  {
    currentName: '⚖️ Balanced Persistent Disk',
    currentType: 'pd-balanced',
    upgradeName: '🚀 SSD Persistent Disk',
    upgradeType: 'pd-ssd',
    pricePerMonth: 10,
  },
  {
    currentName: '⚖️ Balanced Persistent Disk',
    currentType: 'pd-balanced',
    upgradeName: '🔥 Extreme Persistent Disk',
    upgradeType: 'pd-extreme',
    pricePerMonth: 25,
  },
  {
    currentName: '🚀 SSD Persistent Disk',
    currentType: 'pd-ssd',
    upgradeName: '🔥 Extreme Persistent Disk',
    upgradeType: 'pd-extreme',
    pricePerMonth: 15,
  },
]

const vpsToUpgradePlan = {
  Basic: {
    newplan: 'Standard',
    current: 'Basic',
    pricePerMonth: 65,
    pricePerHour: 0.09,
  },
  Standard: {
    newplan: 'Premium',
    current: 'Standard',
    pricePerMonth: 129,
    pricePerHour: 0.18,
  },
  Premium: {
    newplan: 'Enterprise',
    current: 'Premium',
    pricePerMonth: 256,
    pricePerHour: 0.35,
  },
}

async function fetchAvailableCountries() {
  try {
    const url = `${NAMEWORD_BASE_URL}/areas?projectId=${VM_PROJECT_ID}`
    let response = await axios.get(url, { headers })
    if (response?.data?.data) {
      const areas = response?.data?.data.map(item => item.area)
      return areas
    }
    return false
  } catch (err) {
    console.log('Error in fetching address list', err?.response?.data)
    return false
  }
}

async function fetchAvailableRegionsOfCountry(country) {
  try {
    const url = `${NAMEWORD_BASE_URL}/regions?projectId=${VM_PROJECT_ID}&area=${country}`

    let response = await axios.get(url, { headers })
    if (response?.data?.data) {
      const areas = response?.data?.data.map(({ value, label }) => ({ value, label }))
      return areas
    }
    return false
  } catch (err) {
    console.log('Error in fetching region list', err?.response?.data)
    return false
  }
}

async function fetchAvailableZones(region) {
  try {
    const url = `${NAMEWORD_BASE_URL}/zones?projectId=${VM_PROJECT_ID}&region=${region}`

    let response = await axios.get(url, { headers })
    if (response?.data?.data) {
      const areas = response?.data?.data.map(({ name, label }) => ({ name, label }))
      return areas
    }
    return false
  } catch (err) {
    console.log('Error in fetching zone list', err?.response?.data)
    return false
  }
}

async function fetchAvailableDiskTpes(zone) {
  try {
    const url = `${NAMEWORD_BASE_URL}/disk-type-list?projectId=${VM_PROJECT_ID}&zone=${zone}`
    let response = await axios.get(url, { headers })
    if (response?.data?.data) {
      return response?.data?.data
    }
    return false
  } catch (err) {
    console.log('Error in fetching Disk types', err?.response?.data)
    return false
  }
}

async function fetchAvailableVPSConfigs() {
  try {
    const url = `${NAMEWORD_BASE_URL}/list-vps-plans`
    let response = await axios.get(url, { headers })
    if (response?.data?.data) {
      return response?.data?.data.plans
    }
    return false
  } catch (err) {
    console.log('Error in fetching VPS config types', err?.response?.data)
    return false
  }
}

async function calculateVpsInstanceCost(payload) {
  try {
    const url = `${NAMEWORD_BASE_URL}/cost/vm/instance?region=${payload.region}&vcpuCount=${payload.config.specs.vCPU}&memoryGb=${payload.config.specs.RAM}&diskType=${payload.diskType}&diskSizeGb=${payload.config.specs.disk}&preemptible=false`
    let response = await axios.get(url, { headers })
    if (response?.data?.data) {
      return response?.data.data
    }
    return false
  } catch (err) {
    console.log('Error in fetching instance cost', err?.response?.data)
    return false
  }
}

function generateRandomVpsName() {
  const randomSuffix = Math.random().toString(36).substr(2, 12)
  return `vm-instance-${randomSuffix}`
}

function generateRandomSSHName() {
  const randomSuffix = Math.random().toString(36).substr(2, 12)
  return `ssh-key-${randomSuffix}`
}

function generateRandomUsername() {
  const randomSuffix = Math.random().toString(36).substr(2, 8)
  return `user-${randomSuffix}`
}

function generateRandomPassword(length = 16) {
  const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowerCase = 'abcdefghijklmnopqrstuvwxyz'
  const numbers = '0123456789'
  const symbols = '!@#$%^&*()'
  const allCharacters = upperCase + lowerCase + numbers + symbols

  let password = [
    upperCase[Math.floor(Math.random() * upperCase.length)],
    lowerCase[Math.floor(Math.random() * lowerCase.length)],
    numbers[Math.floor(Math.random() * numbers.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
  ]

  for (let i = password.length; i < length; i++) {
    password.push(allCharacters[Math.floor(Math.random() * allCharacters.length)])
  }

  password = password.sort(() => Math.random() - 0.5).join('')

  return password
}

function generateBilingCost(data, plan) {
  let totalCost = 0
  const incrementPerc = Number(PERCENT_INCREASE_VPS)
  switch (plan) {
    case 'hourly':
      totalCost = Number(data.totalCostInHour) + (Number(data.totalCostInHour) * incrementPerc) / 100
      break
    case 'monthly':
      totalCost = Number(data.totalCostInMonth) + (Number(data.totalCostInMonth) * incrementPerc) / 100
      break
    case 'quaterly':
      let costQuaterly = Number(data.totalCostInMonth) * 3
      totalCost = costQuaterly + (costQuaterly * incrementPerc) / 100
      break
    case 'annually':
      let costYearly = Number(data.totalCostInMonth) * 12
      totalCost = costYearly + (costYearly * incrementPerc) / 100
      break
    default:
      break
  }
  return parseFloat(totalCost.toFixed(2))
}

async function fetchSelectedCpanelOptions(cpanel) {
  try {
    let url = `${NAMEWORD_BASE_URL}/vm/${cpanel.name}`

    let response = await axios.get(url, { headers })
    if (response?.data?.data) {
      return response?.data?.data
    }
    return false
  } catch (err) {
    console.log('Error in fetching seleted cpanel options', err?.response?.data)
    return false
  }
}

async function fetchAvailableOS(cpanel) {
  try {
    let url = `${NAMEWORD_BASE_URL}/list-os`
    if (cpanel) {
      url += `?cPanel=${cpanel.name}`
    }

    let response = await axios.get(url, { headers })
    if (response?.data?.data) {
      return response?.data?.data
    }
    return false
  } catch (err) {
    console.log('Error in fetching available OS', err?.response?.data)
    return false
  }
}

async function registerVpsTelegram(telegramId, email) {
  try {
    const url = `${NAMEWORD_BASE_URL}/auth/register-telegram-user`

    let response = await axios.post(
      url,
      {
        email,
        telegramId,
      },
      { headers },
    )
    if (response?.data?.data) {
      return response?.data?.data
    }
    return false
  } catch (err) {
    console.log('Error in registering user', err?.response?.data)
    return false
  }
}

async function fetchUserSSHkeyList(telegramId, instanceName) {
  try {
    let url = `${NAMEWORD_BASE_URL}/ssh/retrieve-All?telegramId=${telegramId}`
    if (instanceName) {
      url += `&instanceName=${instanceName}`
    }
    let response = await axios.get(url, { headers })
    if (response?.data?.data) {
      return response?.data?.data
    }
    return false
  } catch (err) {
    console.log('Error in fetching user ssh key list', err)
    return false
  }
}

async function generateNewSSSkey(telegramId, sshName) {
  try {
    const url = `${NAMEWORD_BASE_URL}/ssh/generate`

    let response = await axios.post(
      url,
      {
        telegramId,
        sshKeyName: sshName ? sshName : generateRandomSSHName(),
      },
      { headers },
    )
    if (response?.data) {
      return response?.data
    }
    return false
  } catch (err) {
    console.log('Error in generating user ssh key', err?.response?.data)
    return false
  }
}

async function uploadSSHPublicKey(telegramId, key, sshName) {
  try {
    const url = `${NAMEWORD_BASE_URL}/ssh/upload-key`

    let response = await axios.post(
      url,
      {
        telegramId,
        sshKeyName: sshName ? sshName : generateRandomSSHName(),
        publicKey: key,
      },
      { headers },
    )
    if (response?.data) {
      return response?.data
    }
    return false
  } catch (err) {
    console.log('Error in uploading SSH Public key', err?.response?.data)
    return false
  }
}

async function createVPSInstance(telegramId, vpsDetails) {
  try {
    const url = `${NAMEWORD_BASE_URL}/create/vm/instance`
    let payload = {
      name: generateRandomVpsName(),
      diskSizeGB: vpsDetails.config.specs.disk,
      autoDelete: true,
      boot: true,
      diskType: vpsDetails.diskType,
      machineType: 'e2-standard-8',
      networkName: 'global/networks/default',
      googleConsoleProjectId: VM_PROJECT_ID,
      zone: vpsDetails.zone,
      telegramId: telegramId,
      autoRenewable: vpsDetails.plan === 'hourly' ? true : vpsDetails.autoRenewalPlan,
      plan: vpsDetails.config.name,
      vCPUs: vpsDetails.config.specs.vCPU,
      RAM: vpsDetails.config.specs.RAM,
      os: vpsDetails.os.value,
    }
    if (vpsDetails.panel) {
      payload.cPanel = vpsDetails.panel.name
      payload.license = vpsDetails.panel.license
    }
    console.log(payload)
    const response = await axios.post(url, payload, { headers })
    if (response?.data?.data) {
      console.log(response?.data.data)
      return { success: true, data: response?.data?.data }
    } else {
      let errorMessage = `Issue in buying VPS Plan ${response?.data?.responseMsg?.message}`
      console.error(errorMessage)
      return { error: errorMessage }
    }
  } catch (error) {
    const errorMessage = `Error in creating VMS instancw ${error.message} ${JSON.stringify(
      error?.response?.data,
      null,
      2,
    )}`
    console.error(errorMessage)
    return { error: errorMessage }
  }
}

async function attachSSHKeysToVM(payload) {
  try {
    const url = `${NAMEWORD_BASE_URL}/attach/sshkeys`
    let newPayload = {
      project: VM_PROJECT_ID,
      zone: payload.zone,
      instanceName: payload.name,
      sshKeys: payload.sshKeys,
      telegramId: payload.telegramId,
    }
    console.log(newPayload)
    const response = await axios.post(url, newPayload, { headers })
    if (response?.data) {
      return response?.data
    }
    return false
  } catch (error) {
    console.log('Error in Attaching SSH key to VPS', error?.response?.data)
    return false
  }
}

async function unlinkSSHKeyFromVps(telegramId, key, vpsDetails) {
  try {
    const url = `${NAMEWORD_BASE_URL}/detach/sshkeys`
    const payload = {
      project: VM_PROJECT_ID,
      zone: vpsDetails.zone,
      instanceName: vpsDetails.name,
      sshKeys: [key],
      telegramId: telegramId,
    }
    const response = await axios.delete(url, {
      headers: headers,
      data: payload,
    })
    if (response?.data) {
      return response?.data
    }
    return false
  } catch (err) {
    console.log('Error in unlinking SSH Public key from VPS', err?.response?.data)
    return false
  }
}

async function downloadSSHKeyFile(telegramId, sshKeyName) {
  try {
    const url = `${NAMEWORD_BASE_URL}/ssh/download`
    const params = {
      telegramId,
      sshKeyName
    }
    const response = await axios.get(url, {
      headers,
      params,
      responseType: 'arraybuffer'
    });
    if (response?.data) {
      return response?.data
    }
    return false
  } catch (err) {
    console.log('Error in downloading SSH Public key from VPS', err?.response?.data)
    return false
  }
}

async function setVpsSshCredentials(host) {
  try {
    const url = `${NAMEWORD_BASE_URL}/ssh/set-password`
    let newPayload = {
      host: host,
      targetUsername: generateRandomUsername(),
      targetPassword: generateRandomPassword(),
    }
    console.log(newPayload)
    const response = await axios.post(url, newPayload, { headers })
    if (response?.data) {
      console.log(response?.data)
      return { success: true, data: response?.data }
    } else {
      let errorMessage = `Issue in generating password for VMS instance ${response?.data}`
      console.error(errorMessage)
      return { error: errorMessage }
    }
  } catch (error) {
    const errorMessage = `Error in generating password for VMS instance ${error.message} ${JSON.stringify(
      error?.response?.data,
      null,
      2,
    )}`
    console.error(errorMessage)
    return { error: errorMessage }
  }
}

async function fetchUserVPSList(telegramId) {
  try {
    const url = `${NAMEWORD_BASE_URL}/list/vm/instances?telegramId=${telegramId}&project=${VM_PROJECT_ID}`

    let response = await axios.get(url, { headers })
    if (response?.data?.data) {
      return response?.data?.data
    }
    return false
  } catch (err) {
    console.log('Error in fetching user vps details', err?.response?.data)
    return false
  }
}

async function fetchVPSDetails(telegramId, vpsName) {
  try {
    const url = `${NAMEWORD_BASE_URL}/get/vm/instance?telegramId=${telegramId}&project=${VM_PROJECT_ID}&instanceName=${vpsName}`

    let response = await axios.get(url, { headers })
    if (response?.data?.data) {
      return response?.data?.data
    }
    return false
  } catch (err) {
    console.log('Error in fetching VPS details', err?.response?.data)
    return false
  }
}

async function changeVpsAutoRenewal(telegramId, vpsName, autoRenewable) {
  try {
    const url = `${NAMEWORD_BASE_URL}/update/plan/vm`

    const payload = {
      instanceName: vpsName,
      autoRenewable: autoRenewable,
      telegramId: telegramId,
    }
    const response = await axios.post(url, payload, { headers })
    if (response?.data?.data) {
      return response?.data?.data
    }
    return false
  } catch (err) {
    console.log('Error in Changing Auto renewable for VPS details', err?.response?.data)
    return false
  }
}

async function changeVpsInstanceStatus(vpsDetails, changeStatus) {
  try {
    const url = `${NAMEWORD_BASE_URL}/${changeStatus}/vm/instance`
    const payload = {
      instanceName: vpsDetails.name,
      project: VM_PROJECT_ID,
      zone: vpsDetails.zone,
    }
    const response = await axios.post(url, payload, { headers })
    if (response?.data) {
      return { success: true, data: response?.data?.data ? response?.data?.data : response?.data }
    } else {
      let errorMessage = `Issue in changing VPS Plan status ${response?.data?.responseMsg?.message}`
      console.error(errorMessage)
      return { error: errorMessage }
    }
  } catch (error) {
    const errorMessage = `Error in changing VMS instance status to ${changeStatus} :  ${error.message} ${JSON.stringify(
      error?.response?.data,
      null,
      2,
    )}`
    console.error(error)
    return { error: errorMessage }
  }
}

async function deleteVPSinstance(chatId, name) {
  try {
    const url = `${NAMEWORD_BASE_URL}/delete/vm/instance`
    const payload = {
      instanceName: name,
      project: VM_PROJECT_ID,
      telegramId: chatId,
    }
    const response = await axios.post(url, payload, { headers })
    if (response?.data) {
      return { success: true, data: response?.data?.data ? response?.data?.data : response?.data }
    } else {
      let errorMessage = `Issue in deleting VPS Plan ${response?.data?.responseMsg?.message}`
      console.error(errorMessage)
      return { error: errorMessage }
    }
  } catch (error) {
    const errorMessage = `Error in deleting VPS instance :  ${error.message} ${JSON.stringify(
      error?.response?.data,
      null,
      2,
    )}`
    console.error(error)
    return { error: errorMessage }
  }
}

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_DOMAIN,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_AUTH_USER,
    pass: process.env.MAIL_AUTH_PASSWORD,
  },
})

async function sendVPSCredentialsEmail(info, response, vpsDetails, credentials) {
  const plan = 'VPS Plan'
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #007bff; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0;">🎉 Congratulations!</h1>
        </div>
        <div style="padding: 10px 20px;  background-color: #f9f9f9; border-radius: 0 0 10px 10px;">
            <p style="font-size: 18px; line-height: 1.6;">
                Hello <strong>${info.username}</strong>,
            </p>
            <p style="font-size: 18px; line-height: 1.6;">
                We are excited to inform you that your <strong style="text-transform: capitalize;">${plan}</strong> has been successfully activated!
            </p>
            <p style="font-size: 18px; line-height: 1.6; color: #007bff;">
                Here’s your order summary:
            </p>

            <table style="width: 100%; margin-top: 10px; border-collapse: separate; border-spacing: 0 10px;">
              <tr>
                  <td style="font-size: 16px; padding: 15px; background-color: #eee; border: 1px solid #ddd; border-radius: 5px;">
                      <strong>VPS Instance Name:</strong> ${response.name}
                  </td>
              </tr>
              <tr>
                  <td style="font-size: 16px; padding: 15px; background-color: #eee; border: 1px solid #ddd; border-radius: 5px;">
                      <strong>Network IP:</strong> ${response.host}
                  </td>
              </tr>
              <tr>
                  <td style="font-size: 16px; padding: 15px; background-color: #eee; border: 1px solid #ddd; border-radius: 5px;">
                      <strong>OS System:</strong> ${vpsDetails.os ? vpsDetails.os.name : 'Not Selected'}
                  </td>
              </tr>
              <tr>
                  <td style="font-size: 16px; padding: 15px; background-color: #eee; border: 1px solid #ddd; border-radius: 5px;">
                      <strong>UserName:</strong> ${credentials.username}
                  </td>
              </tr>
              <tr>
                  <td style="font-size: 16px; padding: 15px; background-color: #eee; border: 1px solid #ddd; border-radius: 5px;">
                      <strong>Password</strong> ${credentials.password}
                  </td>
              </tr>
            </table>

            <p style="font-size: 18px; margin-top: 10px; line-height: 1.6;">
                If you need any assistance, feel free to contact our support team.
            </p>
            
            <p style="font-size: 18px; line-height: 1.6; margin-top: 15px;">
                Best regards,<br>
                Nomadly Team
            </p>
        </div>
    </div>
    `

  try {
    const mailResponse = await transporter.sendMail({
      from: process.env.MAIL_SENDER,
      to: info.userEmail,
      subject: `🎉 Your ${plan} has been Activated!`,
      html: emailHtml,
    })

    console.log('Message sent: %s', mailResponse.messageId)
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

const getExpiryDateVps = plan => {
  const now = new Date()
  let expiresAt
  switch (plan) {
    case 'hourly':
      expiresAt = new Date(now.getTime() + 1 * 60 * 60 * 1000)
      break
    case 'monthly':
      expiresAt = new Date(now)
      expiresAt.setMonth(expiresAt.getMonth() + 1)
      break
    case 'quaterly':
      expiresAt = new Date(now)
      expiresAt.setMonth(expiresAt.getMonth() + 3)
      break
    case 'annually':
      expiresAt = new Date(now)
      expiresAt.setFullYear(expiresAt.getFullYear() + 1)
      break

    default:
      break
  }
  return expiresAt
}

const calculatePriceForVPS = (amountPerMonth, plan) => {
  let price
  switch (plan) {
    case 'hourly':
      const totalHours = 30 * 24 // 30 days * 24 hours per day
      price = (amountPerMonth / totalHours).toFixed(2)
      break
    case 'monthly':
      price = amountPerMonth
      break
    case 'quaterly':
      price = amountPerMonth * 3
      break
    case 'annually':
      price = amountPerMonth * 12
      break
    default:
      break
  }
  return price
}

module.exports = {
  fetchAvailableCountries,
  fetchAvailableRegionsOfCountry,
  fetchAvailableZones,
  calculateVpsInstanceCost,
  createVPSInstance,
  sendVPSCredentialsEmail,
  getExpiryDateVps,
  changeVpsInstanceStatus,
  generateBilingCost,
  fetchAvailableDiskTpes,
  fetchAvailableOS,
  calculatePriceForVPS,
  registerVpsTelegram,
  fetchUserSSHkeyList,
  generateNewSSSkey,
  uploadSSHPublicKey,
  fetchAvailableVPSConfigs,
  fetchSelectedCpanelOptions,
  attachSSHKeysToVM,
  fetchUserVPSList,
  fetchVPSDetails,
  deleteVPSinstance,
  setVpsSshCredentials,
  unlinkSSHKeyFromVps,
  changeVpsAutoRenewal,
  downloadSSHKeyFile,
  upgradeDiskOptions,
  vpsToUpgradePlan,
}
