const iconResolver = (icon) => {
    switch (icon.slice(0, -1)) {
        case '01':
            return '🌞';
        case '02':
            return '🌤';
        case '03':
            return '🌥';
        case '04':
            return '🌥';
        case '09':
            return '🌧';
        case '10':
            return '🌦';
        case '11':
            return '🌩';
        case '13':
            return '⛄️';
        case '50':
            return '🌫';
    }
}

export const getSuccessData = (data) => {
    return {
        city: data.name,
        description: data.weather[0].description,
        icon: iconResolver(data.weather[0].icon),
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
