const whitelist = require('./../config/whitelist'); //import the whitelist from config/whitelist.js

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (whitelist.indexOf(origin) !== -1 || !origin) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

module.exports = credentials;