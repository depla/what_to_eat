require("dotenv").config();
const sdk = require('@api/fsq-developers');
const axios = require('axios');

const apiKey = process.env.FOURSQUARE_API_KEY;
const IMAGE_SIZE = '300x300'
sdk.auth(apiKey);

const convertFields = (element) => {
    var converted = {};

    converted.id = element.fsq_id;
    converted.name = element.name;
    var location = {}
    location.display_address = element.location.formatted_address;
    converted.location = location;
    converted.image_url = element.photos.length > 0 ? element.photos[0].prefix + IMAGE_SIZE + element.photos[0].suffix : null;
    converted.rating = element.rating / 2
    converted.url = element.website || null

    return converted;
}

const fetchMapData = async (location) => {
    return axios.get(`https://api.geocodify.com/v2/geocode?api_key=${process.env.GEOCODIFY_API_KEY}&q=${location}`);
}

module.exports.getFoursquareRecs = async (req, res) => {
    const { search, location, isOpen } = req.body;
    const mapData = await fetchMapData(location);
    const coordinates = mapData?.data.response.features[0]?.geometry.coordinates;
    const metadata = {
        query: search,
        open_now: isOpen ? true : null,
        sort: 'RELEVANCE',
        limit: '50',
        fields: 'fsq_id,name,photos,website,rating,location',
    }

    if (coordinates) {
        metadata.ll = `${coordinates[1]},${coordinates[0]}`;
        metadata.radius = 15000;
    }
    else {
        metadata.near = location
    }

    sdk.placeSearch(metadata)
        .then(({ data }) => {
            const businesses = data.results;
            var result = {};
            result.businesses = [];

            businesses.forEach(element => {
                result.businesses.push(convertFields(element));
            });
            res.status(200).send(result);
        })
        .catch(err => {
            console.error(err)
            res.status(500).send('Internal Server Error');
        });
}

module.exports.getFoursquareBusiness = async (req, res) => {
    const { businessId } = req.body;

    sdk.placeDetails({ fsq_id: businessId, fields: 'fsq_id,name,photos,website,rating,location' })
        .then(({ data }) => {
            res.status(200).send(convertFields(data));
        })
        .catch(err => {
            console.error(err)
            res.status(500).send('Internal Server Error');
        });
}