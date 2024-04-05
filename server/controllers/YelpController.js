require("dotenv").config();
const yelp = require("yelp-fusion");
const apiKey = process.env.YELP_API_KEY;
const yelpClient = yelp.client(apiKey);

module.exports.getYelpRecs = async (req, res) => {
    const { search, location } = req.body;
    const searchRequest = {
        term: search,
        location: location,
        sort_by: 'best_match',
        limit: 50,
        radius: 8000
    };
    yelpClient.search(searchRequest)
        .then((response) => {
            res.send(JSON.stringify(response.jsonBody));
        })
        .catch((error) => {
            console.log(error);
        });
}