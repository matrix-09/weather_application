const express = require('express');
const { getCityWeather } = require('../controllers/weatherController.js');
const router = express.Router();

router.get('/:city', getCityWeather);

module.exports = router;
