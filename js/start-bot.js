const axios = require('axios');
const { log } = require('console');
const { convert } = require('./pay-blockbee');
const { getBusinessId } = require('./pay-fincra');
const { isRailwayAPIWorking } = require('./rl-save-domain-in-server');
// const { getRegisteredDomainNames } = require('./get-purchased-domains.test');

const getIPAndLogMessage = async () => {
  try {
    const response = await axios.get('https://api.ipify.org/');
    const ip = response.data;
    const message = `Please add \`\`\`${ip}\`\`\` to whitelist in Connect Reseller, API Section. https://global.connectreseller.com/tools/profile`;
    log(message);
  } catch (error) {
    handleAxiosError(error, 'Error fetching IP address');
  }
};

const logConversion = async (amount, fromCurrency, toCurrency, description) => {
  try {
    const result = await convert(amount, fromCurrency, toCurrency);
    log(`Working, ${description}:`, result);
  } catch (error) {
    handleAxiosError(error, `Error converting ${fromCurrency} to ${toCurrency}`);
  }
};

const handleAxiosError = (error, customMessage) => {
  log(customMessage);
  log(
    'Detailed Error:',
    error?.message,
    error?.response?.data,
    error?.cause,
    JSON.stringify(error?.response?.data, null, 2)
  );
};

const runBot = async () => {
  try {
    // Fetch and log the IP to whitelist in Connect Reseller
    // await getIPAndLogMessage();

    // Uncomment if needed in the future
    // await getBusinessId();
    log('Working, Fincra API');

    // Uncomment if needed in the future
    // await getRegisteredDomainNames();
    // log('Working, Connect Reseller API');

    // Fetch and log BTC to USD conversion
    // await logConversion('1', 'btc', 'usd', 'Blockbee API, BTC price in USD');

    // Fetch and log MATIC to USD conversion
    // await logConversion('1', 'polygon_matic', 'usd', 'Matic price in USD');

    // Check if Railway API is working
    // await isRailwayAPIWorking();
    log('Working, Railway API, now starting the bot');

    // Start the bot
    require('./_index.js');

  } catch (error) {
    log('Error is:', error);
  }
};

// Run the bot
runBot();
