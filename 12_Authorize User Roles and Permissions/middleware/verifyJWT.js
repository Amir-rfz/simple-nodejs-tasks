const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401); // Unauthorized

    const token = authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = decoded.UserInfo.username; // Save the username to request object
        req.roles = decoded.UserInfo.roles; // Save the roles to request object
        next(); // Proceed to the next middleware or route handler
    });
}

module.exports = verifyJWT;