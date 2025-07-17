require('dotenv').config();
const axios = require('axios');

const apiKey = process.env.API_SILVERLINING;
const silverLiningApiUrl = 'https://api.aws3.link/shorten';
const silverLiningTrackUrl = 'https://api.aws3.link/track';
const domains = process.env.CUSTOM_DOMAIN.split(',').map(domain => domain.trim());

const createShortUrlApi = async (longUrl, customSlug = null) => {
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
            customSlug: customSlug || undefined, 
            slugLength: customSlug ? undefined : 6, 
            customDomain: selectedDomain,
          },
          {
            headers: {
              'x-api-key': apiKey,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          return response.data.shortUrl;
        } else {
          console.error(`Error creating short URL for ${selectedDomain}, Code:`, response?.status);
          return null;
        }
      })
    );

    
    while (shortUrls.length < 4) {
      shortUrls.push(null);
    }

    return shortUrls;
  } catch (error) {
    console.error('Error creating short URLs:', error.response?.data || error.message);
    return [null, null, null, null]; 
  }
};

const analyticsSilverLining = async (shortUrlHash, domain) => {
  try {
    const response = await axios.post(silverLiningTrackUrl, {
      slug: shortUrlHash,
      customDomain: domain || 'aws3.link'
    }, {
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      return response.data.totalHits || 0;
      //return Object.values(clickData).reduce((sum, val) => sum + (typeof val === 'number' ? val : 0), 0)
    } else {
      console.error('Error getting total clicks, Code:', response?.status);
      return 0;
      console.error('Error getting total clicks, Code:', response?.status)
      return 0
    }
  } catch (error) {
    console.error('Error getting analytics:', error.response?.data || error.message)
    return error?.response?.data?.message || 'No such URL'
  }
}

module.exports = { createShortUrlApi, analyticsSilverLining }
