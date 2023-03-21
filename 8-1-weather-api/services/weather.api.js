import axios from 'axios';

export const getWeatherByCity = async ({ token, data: { city } }) => {
    try {
        const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: city,
                APPID: token,
                lang: 'ru',
                units: 'metric'
            }
        });
        
        return { result: data };
    } catch (error) {

        return {
            error: {
                code: error?.response?.status || 500,
            }
        };
    }
}
