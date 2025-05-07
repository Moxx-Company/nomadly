/* global process */
require('dotenv').config()
const axios = require('axios')

const NAMEWORD_BASE_URL = process.env.NAMEWORD_BASE_URL;

const getDomainDetails = async websiteName => {
  try {
    const URL = `${NAMEWORD_BASE_URL}/domain/appview-domain`

    const params = {
      domain: websiteName,
    }
    const headers = {
      accept: 'application/json',
      'content-type': 'application/json',
      'x-api-key': process.env.NAMEWORD_API_KEY,
    }

    const config = {
      headers,
      params: params
    }

    const response = await axios.get(URL, config)

    if (response?.status === 200) {
      const domainDetails = response.data
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

// const websiteName = 'glasso.sbs';
// getDomainDetails(websiteName).then(log);
module.exports = getDomainDetails
