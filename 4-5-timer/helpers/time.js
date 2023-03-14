function getDelayInSeconds(val1, val2, val3) {
    if (!isNaN(Number(val1))) {
        return Number(val1);
    }

    return [val1, val2, val3].reduce((seconds, time) => {
        const timeValue = parseInt(time);

        if (timeValue) {
            const factor = getSecondsFactor(time.slice(-1));

            return seconds += timeValue * factor;
        }

        return seconds;
    }, 0)
}

function getSecondsFactor(timeType) {
    switch (timeType) {
        case 'h':
            return 3600;
        case 'm':
            return 60;
        case 's':
            return 1;
        default:
            return 0;
    }
}

export { getDelayInSeconds };