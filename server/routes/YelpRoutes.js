const express = require('express');
const router = express.Router();

const yelpcontroller = require('../controllers/YelpController');

router.get('/search-food', yelpcontroller.getYelpRecs);
router.post('/find-business', yelpcontroller.getYelpBusiness);

module.exports = router;