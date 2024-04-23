const express = require('express');
const router = express.Router();

const foursquareController = require('../controllers/FoursquareController');

router.post('/search-food', foursquareController.getFoursquareRecs);
router.post('/find-business', foursquareController.getFoursquareBusiness);

module.exports = router;