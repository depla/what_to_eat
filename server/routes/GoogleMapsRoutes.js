const express = require('express');
const router = express.Router();

const googleMapsController = require('../controllers/GoogleMapsController');

router.post('/search-food', googleMapsController.getGoogleRecs);
router.post('/find-business', googleMapsController.getGoogleBusiness);
router.post('/photo', googleMapsController.getGooglePhotoUrl)
router.post('/reviews-url', googleMapsController.getGoogleReviewsUrl)

module.exports = router;