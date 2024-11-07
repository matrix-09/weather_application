const weatherService = require('../services/weatherService.js');

exports.getCityWeather = async (req, res) => {
    const city = req.params.city;

    try {
        const weatherData = await weatherService.getCityWeather(city);
        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ message: 'Server error k' });
    }
};
