const express = require('express');
const router = express.Router();

const businessesController = require('../controllers/BusinessesController');
const { validateJwt } = require('../middleware/AuthMiddleware')

router.post('/', validateJwt, businessesController.createSavedBusiness);
router.get('/', validateJwt, businessesController.getSavedBusinesses);
router.delete('/', validateJwt, businessesController.deleteSavedBusiness);

module.exports = router;