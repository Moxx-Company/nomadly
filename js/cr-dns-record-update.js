/* global process */
require('dotenv').config()
const axios = require('axios')
const { log } = require('console')
const APIKey = process.env.API_KEY_CONNECT_RESELLER
const { updateDNSRecordNs } = require('./cr-dns-record-update-ns')
const { saveServerInDomain } = require('./cr-dns-record-add')
const NAMEWORD_BASE_URL = process.env.NAMEWORD_BASE_URL;
const updateDNSRecord = async (
  DNSZoneID,
  DNSZoneRecordID,
  domainName,
  RecordType,
  RecordValue,
  domainNameId,
  nsId,
  dnsRecords,
  hostName,
  oldRecordName = null,
  oldRecordValue = null,
  provider,
  recordTTL = 900,
  recordPriority = 1,
  oldRecordType = null,
  oldRecordTTL = 900,
  oldRecordPriority = 1,
) => {
  if (RecordType === 'NS') return await updateDNSRecordNs(domainNameId, domainName, RecordValue, nsId, dnsRecords,provider)

  // Custom Requirement fulfilled, if no A record present then show A Record: None, so we are updating it by creating it
  if (RecordType === 'A' && (provider !== "openprovider" && !DNSZoneID)) return await saveServerInDomain(domainName, RecordValue, 'A', null, null, null, hostName)
  
  try {
    const apiUrl = `${NAMEWORD_BASE_URL}/dns/modify`

    const headers = {
      accept: 'application/json',
      'content-type': 'application/json',
      'x-api-key': process.env.NAMEWORD_API_KEY,
    }
    var RecordName =  hostName ? (provider == 'openprovider' ? hostName : `${hostName}.${domainName}`) :domainName

    var oldRecordNameValue = oldRecordName
    if (provider === 'openprovider' ) {
      oldRecordNameValue= oldRecordName?.replace(`.${domainName}`, '')
    }
    const requestData = {
      dnsZoneId: DNSZoneID || "11", 
      dnsZoneRecordId: DNSZoneRecordID || "11",
      recordName: RecordName,
      recordType: RecordType,
      recordValue: RecordValue,
      recordTTL,
      recordPriority,
      oldRecordName: oldRecordName,
      oldRecordType:RecordType,
      // oldRecordType: oldRecordType || RecordType,
      oldRecordValue: oldRecordValue ,
      oldRecordTTL: oldRecordTTL,
      oldRecordPriority: oldRecordPriority ,
      domain: domainName,
      provider
    }

    const response = await axios.get(apiUrl, { 
      params: requestData,
      headers
    })
    log(
      'update DNS Record ',
      { DNSZoneID, DNSZoneRecordID, RecordName, RecordType, RecordValue },
      JSON.stringify(response.data, null, 2),
    )

    if (response?.data?.responseMsg?.statusCode === 200) {
      return { success: true }
    } else {
      let errorMessage = `Issue in update DNS Record ${response?.data?.responseMsg?.message}`
      log(errorMessage)
      return { error: errorMessage }
    }
  } catch (error) {
    const errorMessage = `Error update DNS Record ${error.message} ${JSON.stringify(error?.response?.data, null, 2)}`
    log(error, errorMessage)
    return { error: errorMessage }
  }
}
// const dnszoneID = 153141;
// const dnszoneRecordID = 1112779751;
// updateDNSRecord(dnszoneID, dnszoneRecordID, 'glasso.sbs', 'CNAME', 'abc.def').then(log);

module.exports = { updateDNSRecord }
