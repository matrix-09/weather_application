import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const WeatherChart = ({ weatherData }) => {
    const chartData = {
        labels: weatherData.map(item => item.date),
        datasets: [
            {
                label: 'Temperature (°C)',
                data: weatherData.map(item => parseFloat(item.temp)),
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Temperature Forecast',
            },
        },
    };

    return (
        <div>
            <h3>Temperature Forecast Chart</h3>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default WeatherChart;
