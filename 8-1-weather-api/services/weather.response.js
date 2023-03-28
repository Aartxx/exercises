const ICONS_MAP = {
    '01': '🌞',
    '02': '🌤',
    '03': '🌥',
    '04': '🌥',
    '09': '🌧',
    '10': '🌦',
    '11': '🌩',
    '13': '⛄️',
    '50': '🌫',
};

export const getSuccessData = (data) => {
    const iconCode = data.weather[0].icon.slice(0, -1);

    return {
        city: data.name,
        description: data.weather[0].description,
        icon: ICONS_MAP[iconCode],
        temp: data.main.temp,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
    }
}

export const getErrorMessage = (code) => {
    switch (code) {
        case 400:
            return 'City not specified!\n';
        case 401:
            return 'Invalid token!\n';
        case 404:
            return 'Can\'t find specified city\n';
    
        default:
            return 'Unknown error!\n';
    }
};
