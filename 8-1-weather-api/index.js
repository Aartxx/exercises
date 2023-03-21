import express from 'express';
import { parseLocation } from './middleware/parse-location.js';
import { getWeatherByCity } from './services/weather.api.js';
import { getSuccessData, getErrorMessage } from './services/weather.response.js';

const PORT = 3000;
const app = express();

app.get('/show-me-weather', parseLocation, async (req, res) => {
    if (!req.location) {
        return res.status(400).send(getErrorMessage(400));
    }

    const token = req.get('token');

    if (!token) {
        return res.status(401).send(getErrorMessage(401))
    }

    const { result, error } = await getWeatherByCity({
        token,
        data: req.location,
    });

    if (error) {
        return res.status(error.code).send(getErrorMessage(error.code));
    }

    res.json(getSuccessData(result));
});

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
});
