/* global process */
require('dotenv').config()
const axios = require('axios')
const getDomainDetails = require('./cr-domain-details-get')
const { log } = require('console')

const NAMEWORD_BASE_URL = process.env.NAMEWORD_BASE_URL;

async function getDNSRecords(domain, domainId,provider) {
  const URL = `${NAMEWORD_BASE_URL}/dns/view`
  try {
    const params = {
      domain: domain,
      provider: provider,
      domainId: domainId
    }
    console.log(params)
    const headers = {
      accept: 'application/json',
      'content-type': 'application/json',
      'x-api-key': process.env.NAMEWORD_API_KEY,
    }
    const response = await axios.get(URL, { params, headers })

    if (response.status === 200) {
      return response?.data?.responseData?.records || response?.data?.responseData
    } else {
      log(`Error fetching DNS records. Status Code: ${response.status}`)
    }
  } catch (error) {
    log(`Error: ${error.message}`)
  }
}

// const viewDNSRecords = async domain => {
//   const details = await getDomainDetails(domain)

//   const { websiteId, domainNameId, nameserver1, nameserver2, nameserver3, nameserver4 } = details?.responseData
//   if (!websiteId || !domainNameId) {
//     log('No websiteId,', details?.responseMsg?.message)
//     return
//   }

//   const res = await getDNSRecords(websiteId)
//   let records = []

//   const a_records = res.filter(r => r.recordType === 'A')
//   records = a_records.length === 0 ? [{ recordContent: null, recordType: 'A' }] : a_records

//   nameserver1 && records.push({ domainNameId, recordContent: nameserver1, recordType: 'NS', nsId: 1 })
//   nameserver2 && records.push({ domainNameId, recordContent: nameserver2, recordType: 'NS', nsId: 2 })
//   nameserver3 && records.push({ domainNameId, recordContent: nameserver3, recordType: 'NS', nsId: 3 })
//   nameserver4 && records.push({ domainNameId, recordContent: nameserver4, recordType: 'NS', nsId: 4 })

//   records = [...records, ...res.filter(r => r.recordType === 'CNAME')]

//   return { records, domainNameId }
// }

const viewDNSRecords = async (domain) => {
  try {
    const details = await getDomainDetails(domain);

    const { websiteId, domainNameId, nameserver1, nameserver2, nameserver3, nameserver4} = details?.responseData || {};
    if (!websiteId || !domainNameId) {
      log('No websiteId,', details?.responseMsg?.message)
      return
    }

    

    const res = await getDNSRecords(domain,websiteId || domainNameId,details?.provider);
    let records = [];

    console.log("res",res)

    // const a_records = res?.filter(r => r?.recordType === 'A' || r?.type === 'A') || [];
    const a_records = res?.filter(r => r?.recordType === 'A' || r?.type === 'A').map(r => ({
      recordContent: r.recordContent || r.value || null,
      recordType: 'A',
      recordName: r.recordName ||r.name || null,
      domainNameId: r.domainNameId || null,
      dnszoneID:r?.dnszoneID, 
      dnszoneRecordID:r?.dnszoneRecordID || r?.id
    })) || [];
    
    records = a_records?.length === 0 ? [{ recordContent: null, recordType: 'A' }] : a_records;


    nameserver1 && records.push({ domainNameId, recordContent: nameserver1, recordType: 'NS', nsId: 1 });
    nameserver2 && records.push({ domainNameId, recordContent: nameserver2, recordType: 'NS', nsId: 2 });
    nameserver3 && records.push({ domainNameId, recordContent: nameserver3, recordType: 'NS', nsId: 3 });
    nameserver4 && records.push({ domainNameId, recordContent: nameserver4, recordType: 'NS', nsId: 4 });
    records = [...records, ...(res?.filter(r => r?.recordType === 'CNAME' || r?.type === 'CNAME') || []).map(r => ({
      recordContent: r.recordContent || r.value || null,
      recordType: 'CNAME',
      recordName: r.recordName || r.name || null,
      domainNameId: r?.domainNameId || null,
      dnszoneID:r?.dnszoneID, 
      dnszoneRecordID:r?.dnszoneRecordID || r?.id
    }))];
    console.log("records",records)



    return { records, domainNameId ,provider: details?.provider};
  } catch (error) {
    console.error('❌ Error in viewDNSRecords:', error.message || error);
    return { records: [], domainNameId: null, error: true };
  }
};


// viewDNSRecords('glasso.sbs').then(log);

module.exports = viewDNSRecords
