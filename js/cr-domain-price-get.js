/* global process */
require('dotenv').config()
const axios = require('axios')
;('')
const NAMEWORD_BASE_URL = process.env.NAMEWORD_BASE_URL;
// const API_KEY = process.env.API_KEY_CONNECT_RESELLER
const PERCENT_INCREASE_DOMAIN = 1 + Number(process.env.PERCENT_INCREASE_DOMAIN)

// Function to test domain availability
async function checkDomainPriceOnline(domainName) {
  const apiUrl = `${NAMEWORD_BASE_URL}/domain/search?websiteName=${domainName}&renewalFeePerc=0&transferFeePerc=0&registrationFeePerc=0`

  const headers = {
    accept: 'application/json',
    'content-type': 'application/json',
    'x-api-key': process.env.NAMEWORD_API_KEY,
  }

  let response
  
  try {
    response = await axios.get(apiUrl, {
      headers,
    })

    const statusCode = response?.status

    if (statusCode === 200) {
      const domainData = response?.data

      if (domainData?.responseData?.available) {
        if (domainData?.responseData.domainType === 'Premium')
          return {
            available: true,
            price: domainData.responseData.registrationFee,
            originalPrice: domainData.responseData.registrationFee,
            provider:domainData?.provider
          }
        const price = Math.ceil(domainData.responseData.registrationFee * PERCENT_INCREASE_DOMAIN)
        return {
          available: true,
          originalPrice: domainData.responseData.registrationFee < 1 ? 1 : domainData.responseData.registrationFee,
          price: price < 10 ? 10 : price,
          provider:domainData?.provider

        }
      } else {
        return {
          available: false,
          message: domainData.message || 'Domain not available',
        }
      }
    } else {
      return {
        available: false,
        message: 'Invalid domain name or API error',
      }
    }
  } catch (error) {
    const message = `An error occurred while checking domain availability. ${error?.message} ${JSON.stringify(
      error?.response?.data,
      null,
      2,
    )}`

    console.error('checkDomainPriceOnline', message)

    return {
      available: false,
      message,
    }
  }
}

module.exports = { checkDomainPriceOnline }
