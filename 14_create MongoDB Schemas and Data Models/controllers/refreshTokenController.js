const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

const jwt = require('jsonwebtoken');

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401); // Unauthorized
    console.log(cookies.jwt); // Log the refresh token for debugging
    const refreshToken = cookies.jwt;
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) return res.sendStatus(401); //Unauthorized 

    // evaluate jwt
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err || foundUser.username !== decoded.username) return res.sendStatus(403); // Forbidden
        const roles = Object.values(foundUser.roles);
        // create new access token
        const accessToken = jwt.sign(
            { "UserInfo": { 
                "username": decoded.username, 
                "roles": roles } },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '5m' }
        );
        res.json({ accessToken }); // Send new access token to the client
        }
    );
}

module.exports = { handleRefreshToken };