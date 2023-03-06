function compute({ start, end }) {
    let count = 0;

    for (let index = start; index <= end; index++) {
        if (index && index % 3 === 0) {
            count++
        }
    }

    return count;
}

module.exports = {
    compute,
}
