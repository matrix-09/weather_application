const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
    city: String,
    date: Date,
    avgTemp: Number,
    maxTemp: Number,
    minTemp: Number,
    dominantWeather: String
});

module.exports = mongoose.model('Weather', weatherSchema);
