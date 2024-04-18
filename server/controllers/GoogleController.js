require("dotenv").config();
const { OAuth2Client } = require('google-auth-library');
const { PrismaClient } = require('@prisma/client');

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);
const prisma = new PrismaClient();

module.exports.googleLogin = async (req, res) => {
    const { tokenId } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const user = { name: payload['name'], picture: payload['picture'] }
        // Set HTTP-only cookie with JWT token
        const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
        res.cookie('jwt', tokenId, { httpOnly: true, secure: true, expires: expirationDate, sameSite: "None" });
        //Add to DB if new user
        const existingEntry = await prisma.user.findUnique({
            where: {
                email: payload['email'],
            },
        });
        if (!existingEntry) {
            await prisma.user.create({
                data: {
                    email: payload['email'],
                },
            });
        }
        res.status(200).send(user);
    } catch (error) {
        console.error('Error Logging In', error);
        res.status(500).send('Internal server error');
    }
}

module.exports.googleLogout = async (req, res) => {
    res.clearCookie('jwt');
    res.status(200).send("Logout Successful")
}

module.exports.googleGetUserData = async (req, res) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: req.cookies.jwt,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const user = { name: payload['name'], picture: payload['picture'] }

        res.status(200).send(user);
    } catch (error) {
        console.error('Error Getting User Data', error);
        res.status(401).send('Not Authorized');
    }
}