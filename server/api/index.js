const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var cors = require('cors')
require('dotenv').config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const environment = app.get('env');
const origin = environment === "production" ? process.env.FRONT_END_PROD_BASE_URL : process.env.FRONT_END_DEV_BASE_URL;
app.use(cors({
    origin: origin,
    credentials: true,
}))

const yelpRoutes = require('../routes/YelpRoutes');
const googleRoutes = require('../routes/GoogleRoutes');
const businessesRoutes = require('../routes/BusinessesRoutes');
const foursquareRoutes = require('../routes/FoursquareRoutes');
const googleMapsRoutes = require('../routes/GoogleMapsRoutes');

app.use('/api', yelpRoutes);
app.use('/api', googleRoutes);
app.use('/api/businesses', businessesRoutes);
app.use('/api/foursquare', foursquareRoutes);
app.use('/api/google', googleMapsRoutes);


app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(3000, () => {
    console.log("Serving on port 3000");
})