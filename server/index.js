const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const yelpRoutes = require('./routes/YelpRoutes');
const googleRoutes = require('./routes/GoogleRoutes');
const businessesRoutes = require('./routes/BusinessesRoutes');

app.use('/api', yelpRoutes);
app.use('/api', googleRoutes);
app.use('/api/businesses', businessesRoutes);

app.listen(3000, () => {
    console.log("Serving on port 3000");
})