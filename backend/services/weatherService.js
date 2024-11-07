const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const apiKey = process.env.OPENWEATHER_API_KEY;
const convertKelvinToCelsius = (temp) => (temp - 273.15).toFixed(2);
const alertThresholds = { tempThreshold: 35, consecutiveBreaches: 2 };
let breachCount = 0;  // Counter for consecutive breaches

const checkThresholds = (weatherData) => {
    const breaches = weatherData.filter(item => parseFloat(item.temp) > alertThresholds.tempThreshold);

    // Check if consecutive breaches meet the threshold
    if (breaches.length >= alertThresholds.consecutiveBreaches) {
        //console.log("Alert: Temperature threshold breached!");
        // Trigger email alert here if needed
        breachCount = 0;  // Reset the counter after alert
    } else {
        breachCount++;
    }
};

const getCityWeather = async (city) => {
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
        );
        const weatherData = response.data.list.map(item => ({
            date: item.dt_txt,
            temp: convertKelvinToCelsius(item.main.temp),
            temp_min: convertKelvinToCelsius(item.main.temp_min),
            temp_max: convertKelvinToCelsius(item.main.temp_max),
            weather: item.weather[0].main,
            description: item.weather[0].description,
            wind_speed: item.wind.speed,
            humidity: item.main.humidity,
            visibility: item.visibility,
        }));

        //checkThresholds(weatherData);  // Check thresholds
        return weatherData;
    } catch (error) {
        //console.error('Error fetching weather data:', error);
        throw new Error('Unable to retrieve weather data');
    }
};

module.exports = { getCityWeather };
