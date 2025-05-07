/* global process */
require('dotenv').config()
const axios = require('axios')
const { log } = require('console')
const { updateDNSRecordNs } = require('./cr-dns-record-update-ns')

const NAMEWORD_BASE_URL = process.env.NAMEWORD_BASE_URL;

// const API_KEY = process.env.API_KEY_CONNECT_RESELLER

const saveServerInDomain = async (
  domainName,
  server,
  RecordType = 'CNAME',
  domainNameId,
  nsId,
  dnsRecords,
  hostName,
) => {
  
  log(`saveServerInDomain ${domainName} ${server} ${RecordType}`)
  let dnsZoneId
  let websiteId
  
  const headers = {
    accept: 'application/json',
    'content-type': 'application/json',
    'x-api-key': process.env.NAMEWORD_API_KEY,
  }
  
  try {
    const URL = `${NAMEWORD_BASE_URL}/domain/appview-domain`
    
    const params = {
      domain: domainName,
    }
    const config = {
      headers,
      params: params,
    }
    
    let provider
    
    const response = await axios.get(URL, config)
    
    if (response?.data?.responseMsg?.statusCode === 200) {
      websiteId = response?.data?.responseData?.websiteId
      provider = response?.data?.provider
    } else {
      let e = response?.data?.responseMsg?.message
      console.error('Erroproviderr saveServerInDomain 1', e)
      return { error: e }
    }
  } catch (error) {
    let e = `${error?.message} ${JSON.stringify(error?.response?.data)}`
    console.error('Error saveServerInDomain 2', e)
    return { error: e }
  }
  if (RecordType === 'NS') return await updateDNSRecordNs(domainNameId, domainName, server, nsId, dnsRecords,provider)
  
  {

    const URL = `${NAMEWORD_BASE_URL}/domain/manage-dns-records`

    const params = {
      domain: domainName,
      provider: provider,
      websiteId:websiteId
    }
    const config = {
      headers,
      params: params,
    }

    const dnsMgmtRes = await axios.get(URL, config)// Enable DNS Management
    console.log({ dnsMgmtRes: dnsMgmtRes?.data })
  }

  try {

    const URL = `${NAMEWORD_BASE_URL}/domain/view-domain`

    const params = {
      domain: domainName,
      provider: provider,
    }
    const config = {
      headers,
      params: params,
    }

    const response = await axios.get(URL, config)

    if (response?.data?.responseMsg?.statusCode === 200) {
      dnsZoneId = response?.data?.responseData?.dnszoneId
    } else {
      let e = response?.data?.responseMsg?.message
      console.error('Error saveServerInDomain 3', e)
      return { error: e }
    }
  } catch (error) {
    let e = `${error?.message} ${JSON.stringify(error?.response?.data)}`
    console.error('Error saveServerInDomain 4', e)
    return { error: e }
  }

  const RECORD_NAME = hostName ? `${hostName}.${domainName}` : domainName
  const RECORD_VALUE = server
  const RECORD_TTL = 600

  try {

    const URL = `${NAMEWORD_BASE_URL}/dns/add`

    const params = {
      dnsZoneId: dnsZoneId || 11,
      recordName: RECORD_NAME || "",
      recordType:RecordType,
      recordValue: RECORD_VALUE,
      recordTTL: RECORD_TTL,
      recordPriority:1,
      domain:domainName,
      provider:provider,
    }
    console.log(params)
    const config = {
      headers,
      params: params,
    }

    const response = await axios.get(URL, config)

    // const url = 'https://api.connectreseller.com/ConnectReseller/ESHOP/AddDNSRecord'
    // const params = {
    //   APIKey: API_KEY,
    //   DNSZoneID: dnsZoneId,
    //   RecordName: RECORD_NAME,
    //   RecordType,
    //   RecordValue: RECORD_VALUE,
    //   RecordTTL: RECORD_TTL,
    // }
    // console.log(params)
    // const response = await axios.get(url, { params })
    const success = 200 === response?.data?.responseData?.statusCode

    return success ? { success } : { error: response?.data?.responseData?.message }
  } catch (error) {
    console.error('Error saveServerInDomain 5', error?.message, error?.response?.data)
    return { error: `${error?.message} ${error?.response?.data}` }
  }
}

// saveServerInDomain('flower-season.sbs', 'abc.server.rail.app').then(console.log)

module.exports = { saveServerInDomain }
