/* global process */
const axios = require('axios')
require('dotenv').config()

const NAMEWORD_BASE_URL = process.env.NAMEWORD_BASE_URL;

const buyDomainOnline = async (domain,provider=null) => {
  try {
    const apiUrl = `${NAMEWORD_BASE_URL}/domain/order`
    const requestData = {
      productType: 1,
      websiteName: domain,
      duration: 1,
      isWhoisProtection: false,
      ns1: '8307.dns1.managedns.org',
      ns2: '8307.dns2.managedns.org',
      id: 150106,
      isEnablePremium: 0,
      provider: provider,
      handle: 'RA1083275-US'
    }

    const response = await axios.get(apiUrl, { 
      params: requestData,
      headers: {
        'x-api-key': process.env.NAMEWORD_API_KEY
      }
    })
    console.log('buyDomain Response:', JSON.stringify(response.data, null, 2))

    if (response?.data?.responseMsg?.statusCode === 200) {
      return { success: true }
    } else {
      let errorMessage = `Issue in buying domain ${response?.data?.responseMsg?.message}`
      console.error(errorMessage)
      return { error: errorMessage }
    }
  } catch (error) {
    console.log(error)
    const errorMessage = `Error buying domain ${error.message} ${JSON.stringify(error?.response?.data, null, 2)}`
    console.error(errorMessage)
    return { error: errorMessage }
  }
}

// buyDomainOnline("cakes-and-bakes.sbs");

module.exports = { buyDomainOnline }
