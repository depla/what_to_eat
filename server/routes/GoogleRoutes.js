const express = require('express');
const router = express.Router();

const googleController = require('../controllers/GoogleController');

router.post('/auth/google/login', googleController.googleLogin);
router.post('/auth/google/logout', googleController.googleLogout);
router.post('/auth/google/user-data', googleController.googleGetUserData);

module.exports = router;