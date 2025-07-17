
require('dotenv').config();
const axios = require('axios');

const apiKey = process.env.API_SILVERLINING;
const silverLiningApiUrl = 'https://api.aws3.link/shorten';
const domains = process.env.CUSTOM_DOMAIN.split(',').map(domain => domain.trim());

const createCustomShortUrl = async (longUrl, customSlug) => {
  try {
 
    const selectedDomains = domains.slice(0, 4);
    if (selectedDomains.length < 4) {
      console.warn('Warning: Fewer than 4 domains provided in CUSTOM_DOMAIN');
    }

    const shortUrls = await Promise.all(
      selectedDomains.map(async (selectedDomain) => {
        const response = await axios.post(
          silverLiningApiUrl,
          {
            longUrl: longUrl,
            customSlug: customSlug, 
            customDomain: selectedDomain,
          },
          {
            headers: {
              'x-api-key': apiKey,
              'Content-Type': 'application/json',
            },
          }
        );
        return response.data.shortUrl;
      })
    );

    while (shortUrls.length < 4) {
      shortUrls.push(null);
    }

    return shortUrls;
  } catch (error) {
    console.error('Error creating custom short URL:', error.response?.data || error.message);
    throw error;
  }
};

module.exports = createCustomShortUrl;