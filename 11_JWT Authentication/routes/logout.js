const express = require('express');
const router = express.Router();
const handleLogout = require('../controllers/logoutController').handleLogout;

router.get('/', handleLogout);

module.exports = router;