const { Client } = require("@googlemaps/google-maps-services-js");
const axios = require("axios");
const googleMapsClient = new Client({});
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_PLATFORM_API_KEY;

const fetchUserLocation = async () => {
    try {
        const geoLoc = await googleMapsClient
            .geolocate({
                params: {
                    key: GOOGLE_MAPS_API_KEY,
                },
                timeout: 1000 // milliseconds
            }, axios);

        return geoLoc.data;

    } catch (error) {
        console.log("Error in getting user location:", error)
    }
}

module.exports = fetchUserLocation;