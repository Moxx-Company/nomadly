/* global process */
require('dotenv').config()
const axios = require('axios')

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

module.exports = checkDomainAvailable
