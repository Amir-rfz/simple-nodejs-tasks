const User = require('../model/User');

const handleLogout = async (req, res) => {
    //on client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No Content

    const refreshToken = cookies.jwt;

    //if refreshToken in db, delete it
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 }); // secure true - only server on https
        return res.sendStatus(204); // No Content
    }

    // delete refreshToken in db\
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);
    
    res.clearCookie('jwt', { httpOnly: true , sameSite: 'None', maxAge: 24 * 60 * 60 * 1000}); // secure true - only server on https
    res.sendStatus(204); // No Content
}

module.exports = { handleLogout };