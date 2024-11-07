import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherChart from './weatherChart.js';
import './weatherSummary.css';

const WeatherSummary = () => {
    const [selectedCity, setSelectedCity] = useState('Delhi');
    const [weatherData, setWeatherData] = useState([]);
    const [currentWeather, setCurrentWeather] = useState(null);

    useEffect(() => {
        if (selectedCity) {
            fetchWeatherData(selectedCity);
        }
    }, [selectedCity]);

    const fetchWeatherData = async (city) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/weather/${city}`);
            setWeatherData(response.data);
            if (response.data.length > 0) {
                setCurrentWeather(response.data[0]);
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

    return (
        <div className="container">
            <h2>Weather</h2>
            <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                ))}
            </select>

            {/* Display current weather */}
            {currentWeather && (
                <div className="current-weather">
                    <h3>Current Weather in {selectedCity}</h3>
                    <p>Date: {currentWeather.date}</p>
                    <p>Temperature: {currentWeather.temp} °C</p>
                    <p>Min Temperature: {currentWeather.temp_min} °C</p>
                    <p>Max Temperature: {currentWeather.temp_max} °C</p>
                    <p>Weather: {currentWeather.weather}</p>
                    <p>Description: {currentWeather.description}</p>
                    <p>Wind Speed: {currentWeather.wind_speed} m/s</p>
                    <p>Humidity: {currentWeather.humidity} %</p>
                    <p>Visibility: {currentWeather.visibility} m</p>
                </div>
            )}

            

            {/* Render weather chart */}
            <div className="chart-container">
                {weatherData.length > 0 && <WeatherChart weatherData={weatherData} />}
            </div>
        </div>
    );
};

export default WeatherSummary;
