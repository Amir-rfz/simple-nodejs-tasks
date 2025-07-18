const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.roles) return res.sendStatus(401); // Unauthorized
        // console.log(req.roles); // Log roles for debugging
        // console.log(allowedRoles); // Log allowed roles for debugging
        const hasRole = req.roles.some(role => allowedRoles.includes(role));
        if (!hasRole) return res.sendStatus(403); // Forbidden
        next(); // Proceed to the next middleware or route handler
    };
} 

module.exports = verifyRoles;