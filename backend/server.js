const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const weatherRoutes = require('./routes/weatherRoutes.js');
const cron = require('node-cron');
const cors = require('cors'); 
const path = require('path');

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'https://weather-application-e6vo.onrender.com/', // Your frontend React app's URL (adjust the port if necessary)
    methods: ['GET', 'POST'], // Define allowed HTTP methods
    credentials: true          // Allow cookies (if needed)
}));

connectDB();

app.use('/api/weather', weatherRoutes);

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });

app.listen(PORT, () => {
    //console.log(`Server running on port ${PORT}`);
});

cron.schedule('*/5 * * * *', () => {
    weatherService.getWeather();
});

