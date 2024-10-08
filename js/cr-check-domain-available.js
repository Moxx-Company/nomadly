/* global process */
require('dotenv').config()
const axios = require('axios')

const API_ADDRESS = process.env.CPANEL_CREATE_ACCOUNT_URL;
const PERCENT_INCREASE_DOMAIN = 1 + Number(process.env.PERCENT_INCREASE_DOMAIN)

const checkDomainAvailable = async websiteName => {
  try {
    const API_KEY = process.env.API_KEY_CONNECT_RESELLER
    const URL = 'https://api.connectreseller.com/ConnectReseller/ESHOP/checkdomainavailable'

    const params = {
      APIKey: API_KEY,
      websiteName: websiteName,
    }

    const response = await axios.get(URL, { params })

    if (response?.status === 200) {
      const domainDetails = response
      // console.log('Domain Details:', domainDetails);
      return domainDetails
    } else {
      console.error('Failed to fetch domain details')
      return null
    }
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

const checkExistingDomain = async websiteName => {
  try {
    const URL = `${API_ADDRESS}/domain/existing?domain=${websiteName}`

    const headers = {
      accept: 'application/json',
      'content-type': 'application/json',
      'x-api-key': process.env.CPANEL_API_KEY,
    }

    const response = await axios.get(URL, { headers })

    console.log('Response:', response);

    return {
      available: true,
      message: response.data.message,
    }
  } catch (error) {
    if (error?.response.status === 409) {
      return {
        available: false,
        message: error.response.data.message,
      }
    } else {
      return {
        available: false,
        message: `An error occurred while checking domain availability. Maybe IP Not Whitelisted. ${error.response?.status}`,
      }
    }
  }
}


const getNewDomain = async domainName => {
  const apiUrl = `${API_ADDRESS}/domain/new?domain=${domainName}`

  const headers = {
    accept: 'application/json',
    'content-type': 'application/json',
    'x-api-key': process.env.CPANEL_API_KEY,
  }

  console.log(apiUrl, headers);
  let domainPrice = 0;
  try {
    let response = await axios.get(apiUrl, { headers })
    response = response.data.data
    console.log('Response:', response);

    let { registrationFee, registrationFees, domainType } = response.responseData;

    if (registrationFees) {
      domainPrice = registrationFees
    } else {
      domainPrice = registrationFee
    }

    const price = Math.ceil(domainPrice * PERCENT_INCREASE_DOMAIN)

    const chatMessage = response.responseMsg.message;
    console.log(chatMessage);

    return {
      available: true,
      originalPrice: domainPrice,
      price: price > 5 ? price : 6,
      chatMessage,
      domainType
    }
  } catch (error) {
    if (error.response.status === 409) {
      return {
        available: false,
        originalPrice: 0,
        price: 0,
        chatMessage: error.response.data.message,
      }
    } else {
      const chatMessage = `An error occurred while checking domain availability. Maybe IP Not Whitelisted. ${error.response?.status}`
      console.error('checkDomainPriceOnline', error.response)

      return {
        available: false,
        originalPrice: 0,
        price: 0,
        chatMessage,
      }
    }
  }
}

module.exports = {checkDomainAvailable, checkExistingDomain, getNewDomain}
