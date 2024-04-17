require("dotenv").config();
const yelp = require("yelp-fusion");
const apiKey = process.env.YELP_API_KEY;
const yelpClient = yelp.client(apiKey);

module.exports.getYelpRecs = async (req, res) => {
    const { search, location } = req.query;
    const limit = 50
    const maxResults = 50
    var data = null;

    const fetchRecs = async () => {
        var numFound = 0;
        for (var offset = 0; offset < maxResults; offset += limit) {
            const searchRequest = {
                term: search,
                location: location,
                sort_by: 'best_match',
                limit: limit,
                radius: 8000,
                offset: offset,
                open_now: true
            };
            await yelpClient.search(searchRequest)
                .then((response) => {
                    numFound = response.jsonBody['businesses'].length;
                    if (data === null) {
                        data = response.jsonBody;
                    }
                    else {
                        data['businesses'].push(...response.jsonBody['businesses']);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            if (numFound < limit) {
                break;
            }
        }
    }

    await fetchRecs().then(() => {
        res.send(JSON.stringify(data));
    })

}

module.exports.getYelpBusiness = async (req, res) => {
    const { businessId } = req.body;
    console.log("got here", businessId)
    yelpClient.business(businessId).then(response => {
        console.log(response.jsonBody);
        res.send(response.jsonBody);
    }).catch(e => {
        console.log(e);
    });

}