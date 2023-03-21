export const parseLocation = (req, res, next) => {
    const { city } = req.query;

    if (city) {
        req.location = { city }
    }

    next();
}
