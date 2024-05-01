require("dotenv").config();
const { Client } = require("@googlemaps/google-maps-services-js");
const axios = require("axios");
const fetchMapData = require('../utils/Geocode');

const googleMapsClient = new Client({});
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_PLATFORM_API_KEY;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const fetchPlacesWithToken = async (nextPageToken) => {
    try {
        const response = await googleMapsClient
            .textSearch({
                params: {
                    pagetoken: nextPageToken,
                    key: GOOGLE_MAPS_API_KEY,
                },
                timeout: 1000 // milliseconds
            }, axios);
        return response.data;
    } catch (error) {
        console.log("Error", error);
    }
}

const fetchPlaces = async (metadata) => {
    try {
        const response = await googleMapsClient
            .textSearch({
                params: metadata,
                timeout: 1000 // milliseconds
            }, axios);
        return response.data;
    } catch (error) {
        console.log("Error", error);
    }
}

const fetchAllPlaces = async (metadata) => {
    const maxCalls = 3;
    var numCalls = 0;
    var places = [];
    var nextPageToken = null;

    try {
        numCalls += 1;
        const initialResults = await fetchPlaces(metadata);
        places = [...places, ...initialResults.results];
        nextPageToken = initialResults.next_page_token || null;
        console.log("init results:", places.length, nextPageToken)

        // Fetch subsequent pages if available
        while (numCalls < maxCalls && nextPageToken) {
            numCalls += 1;
            await sleep(2000);
            const nextPageResults = await fetchPlacesWithToken(nextPageToken);
            places = [...places, ...nextPageResults.results];
            nextPageToken = nextPageResults.next_page_token || null;
        }
    } catch (error) {
        console.log("Error", error);
    }
    return places;
}

const convertFields = (element) => {
    var converted = {};

    converted.id = element.place_id;
    converted.name = element.name;
    var location = {};
    location.display_address = element.formatted_address;
    converted.location = location;
    converted.image_url = element.photos ? element.photos[Math.floor((element.photos.length - 1) / 2)].photo_reference : null;
    converted.rating = element.rating;
    converted.url = element.url || null;
    converted.review_count = element.user_ratings_total;

    return converted;
}

module.exports.getGoogleRecs = async (req, res) => {
    const { search, location, isOpen } = req.body;
    const mapData = await fetchMapData(location);
    const coordinates = mapData?.data.response.features[0]?.geometry.coordinates;
    var result = {};
    result.businesses = [];
    var metadata = {
        query: search,
        location: `${coordinates[1]},${coordinates[0]}`,
        radius: 8000,
        opennow: isOpen,
        key: GOOGLE_MAPS_API_KEY
    }

    fetchAllPlaces(metadata).then(allPlaces => {
        allPlaces.forEach(business => {
            result.businesses.push(convertFields(business));
        });
        res.send(result);
    }).catch(error => {
        console.error('Error in getting recommendations from google:', error);
    });


}

module.exports.getGoogleBusiness = async (req, res) => {
    try {
        const { businessId } = req.body;
        const metadata = {
            fields: ["formatted_address", "name", "url", "photo", "place_id", "rating", "user_ratings_total"],
            place_id: businessId,
            key: GOOGLE_MAPS_API_KEY
        }
        const response = await googleMapsClient
            .placeDetails({
                params: metadata,
                timeout: 1000 // milliseconds
            }, axios);

        res.send(convertFields(response.data.result))


    } catch (error) {
        console.log("Error in getting place details from google:", error)
    }

}

module.exports.getGooglePhotoUrl = async (req, res) => {
    try {
        const { photoReference } = req.body;
        const response = await fetch(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&maxheight=300&photoreference=${photoReference}&key=${GOOGLE_MAPS_API_KEY}`);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        res.setHeader('Content-Type', 'application/octet-stream');
        res.send(buffer);
    } catch (error) {
        console.log("Error in getting place photo from google:", error);
    }
}

module.exports.getGoogleReviewsUrl = async (req, res) => {
    try {
        const { businessId } = req.body;
        const metadata = {
            fields: ["url"],
            place_id: businessId,
            key: GOOGLE_MAPS_API_KEY
        }
        const response = await googleMapsClient
            .placeDetails({
                params: metadata,
                timeout: 1000 // milliseconds
            }, axios);

        res.send(response.data)


    } catch (error) {
        console.log("Error in getting reviews url from google:", error)
    }

}

