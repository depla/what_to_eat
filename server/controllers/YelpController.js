require("dotenv").config();
const yelp = require("yelp-fusion");
const apiKey = process.env.YELP_API_KEY;
const yelpClient = yelp.client(apiKey);

module.exports.getYelpRecs = async (req, res) => {
    const { search, location, isOpen } = req.body;
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
                open_now: isOpen
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
        try {
            data.businesses.forEach(business => {
                business.location.display_address = business.location.display_address.join(", ");
            });
            res.send(JSON.stringify(data));
        } catch (error) {
            console.error('Finding location error', error);
            res.status(400).send('Bad request');
        }
    })

}

module.exports.getYelpBusiness = async (req, res) => {
    const { businessId } = req.body;
    yelpClient.business(businessId).then(response => {
        response.jsonBody.location.display_address = response.jsonBody.location.display_address.join(" ");
        res.send(response.jsonBody);
    }).catch(e => {
        console.log(e);
    });

}