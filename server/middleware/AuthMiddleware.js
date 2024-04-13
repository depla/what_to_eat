require("dotenv").config();
const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);


module.exports.validateJwt = async (req, res, next) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: req.cookies.jwt,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const userEmail = payload['email'];
        if (userEmail) {
            res.locals.userEmail = userEmail;
            next();
        }
        else {
            throw new Error('Not able to retrieve user');
        }
    }
    catch (error) {
        console.error('Error in Authorizing', error);
        res.status(401).send('Not Authorized');
    }

}