require('dotenv').config();
const axios = require('axios');

const apiKey = process.env.API_SILVERLINING;
const silverLiningApiUrl = 'https://api.aws3.link/shorten';
const domains = process.env.CUSTOM_DOMAIN.split(',').map(domain => domain.trim());

const createShortUrl = async (longUrl) => {
  try {
    const shortUrls = await Promise.all(
      domains.map(async (selectedDomain) => {
        const response = await axios.post(
          silverLiningApiUrl,
          {
            longUrl: longUrl,
            slugLength: 6,
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

    return shortUrls;

  } catch (error) {
    console.error('Error shortening URL:', error.response?.data || error.message);
    throw error;
  }
};

module.exports = createShortUrl;

