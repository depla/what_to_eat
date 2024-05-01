const axios = require('axios');

const fetchMapData = async (location) => {
    return axios.get(`https://api.geocodify.com/v2/geocode?api_key=${process.env.GEOCODIFY_API_KEY}&q=${location}`);
}

module.exports = fetchMapData;

