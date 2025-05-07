/* global process */
require('dotenv').config()
const axios = require('axios')
const { log } = require('console')
const APIKey = process.env.API_KEY_CONNECT_RESELLER
const NAMEWORD_BASE_URL = process.env.NAMEWORD_BASE_URL;

const updateDNSRecordNs = async (domainNameId, websiteName, RecordValue, nsId, dnsRecords,provider) => {
  try {

    const URL = `${NAMEWORD_BASE_URL}/domain/modiify-nameserver`


    const headers = {
      accept: 'application/json',
      'content-type': 'application/json',
      'x-api-key': process.env.NAMEWORD_API_KEY,
    }
  

    const requestData = {
      domainNameId,
      websiteName,
      provider:provider
    }


    for (let i = 0; i < dnsRecords.length; i++) {
      const r = dnsRecords[i]
      requestData['nameServer' + r.nsId] = r.recordContent
    }
    // nsId = 1,2,3 or 4
    requestData['nameServer' + nsId] = RecordValue

    const config = {
      headers,
      params: requestData,
    }

    log('updateDNSRecordNs', { requestData })
    const response = await axios.get(URL, config)
    log(
      'update DNS Record Ns ',
      { domainNameId, websiteName, RecordValue, nsId },
      JSON.stringify(response.data, null, 2),
    )

    if (response?.data?.responseMsg?.statusCode === 200) {
      return { success: true }
    } else if (response?.data?.responseMsg?.statusCode === 400) {
      let error = `${response?.data?.responseMsg?.message}`
      log(error)
      return { error }
    } else {
      let error = `Issue in update DNS Record Ns ${response?.data?.responseMsg?.message}`
      log(error)
      return { error }
    }
  } catch (error) {
    const m = `Error Update NS Record ${error.message}`
    log(JSON.stringify(error?.response?.data, null, 2), m)
    return { error: m }
  }
}

// const domainNameId = 1991939,
//   websiteName = 'glasso.sbs',
//   recordValue = '333.dns1.managedns.org',
//   nsId = 1;
// updateDNSRecordNs(domainNameId, websiteName, recordValue, nsId, [
//   { nsId: 1, recordContent: '8307.dns1.managedns.org' },
//   { nsId: 2, recordContent: '8307.dns2.managedns.org' },
//   { nsId: 3, recordContent: '8307.dns3.managedns.org' },
//   { nsId: 4, recordContent: null },
// ]).then(log);

module.exports = { updateDNSRecordNs }
