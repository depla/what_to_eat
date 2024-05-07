const axios = require('axios');

const fetchMapData = async (location) => {
    try {
        return axios.get(`https://api.geocodify.com/v2/geocode?api_key=${process.env.GEOCODIFY_API_KEY}&q=${location}`);
    } catch (error) {
        console.log("Error in geodify api call:", error);
    }
}

module.exports = fetchMapData;

