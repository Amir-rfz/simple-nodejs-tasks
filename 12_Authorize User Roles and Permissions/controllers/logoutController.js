const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

const fsPromises = require('fs').promises;
const { max } = require('date-fns');
const path = require('path');

const handleLogout = async (req, res) => {
    //on client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No Content

    const refreshToken = cookies.jwt;

    //if refreshToken in db, delete it
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 }); // secure true - only server on https
        return res.sendStatus(204); // No Content
    }

    // delete refreshToken in db
    const otherUsers = usersDB.users.filter(person => person.refreshToken !== refreshToken);
    const currentUser = { ...foundUser, refreshToken: '' };
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(usersDB.users)
    );
    res.clearCookie('jwt', { httpOnly: true , secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000}); // secure true - only server on https
    res.sendStatus(204); // No Content
}

module.exports = { handleLogout };