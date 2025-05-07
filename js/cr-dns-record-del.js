/* global process */
require('dotenv').config()
const axios = require('axios')
const { log } = require('console')
const APIKey = process.env.API_KEY_CONNECT_RESELLER
const { updateDNSRecordNs } = require('./cr-dns-record-update-ns')

const NAMEWORD_BASE_URL =  process.env.NAMEWORD_BASE_URL;

const deleteDNSRecord = async (DNSZoneID, DNSZoneRecordID,recordType,recordContent,recordName, domain, domainNameId, nsId, dnsRecords,provider) => {
  if (nsId) return updateDNSRecordNs(domainNameId, domain, undefined, nsId, dnsRecords,provider)
  try {

    // const apiUrl = 'https://api.connectreseller.com/ConnectReseller/ESHOP/DeleteDNSRecord'
    const requestData = {
      dnsZoneId: DNSZoneID || "11",
      dnsZoneRecordId: DNSZoneRecordID || "11",
      provider: provider,
      domainNameId: domainNameId,
      recordType: recordType,
      recordValue: recordContent,
      domain: domain,
      recordName: recordName,
      // recordTTL: 43200,
      // recordPriority: 0,
    }

    const URL = `${NAMEWORD_BASE_URL}/dns/delete`

    const headers = {
      accept: 'application/json',
      'content-type': 'application/json',
      'x-api-key': process.env.NAMEWORD_API_KEY,
    }

    const config = {
      headers,
      params: requestData,
    }

    // const response = await axios.get(apiUrl, { params: requestData })
    const response = await axios.get(URL, config)
    log('deleteDNSRecord ', { DNSZoneID, DNSZoneRecordID }, JSON.stringify(response.data, null, 2))

    if (response?.data?.responseMsg?.statusCode === 200) {
      return { success: true }
    } else {
      let errorMessage = `Issue in deleteDNSRecord ${response?.data?.responseMsg?.message}`
      log(errorMessage)
      return { error: errorMessage }
    }
  } catch (error) {
    const errorMessage = `Error deleteDNSRecord ${error.message} ${JSON.stringify(error?.response?.data, null, 2)}`
    log(error, errorMessage)
    return { error: errorMessage }
  }
}
// const dnszoneID = 153141;
// const dnszoneRecordID = 1112776268;
// deleteDNSRecord(dnszoneID, dnszoneRecordID);

module.exports = { deleteDNSRecord }
