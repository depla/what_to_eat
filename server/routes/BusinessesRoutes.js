const express = require('express');
const router = express.Router();

const businessesController = require('../controllers/BusinessesController');

router.post('/', businessesController.createSavedBusiness);
router.get('/', businessesController.getSavedBusinesses);
router.delete('/', businessesController.deleteSavedBusiness);

module.exports = router;