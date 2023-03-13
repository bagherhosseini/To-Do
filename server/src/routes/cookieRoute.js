const express = require('express');
const { checkCookie } = require('../controllers/cookieController/checkCookieController');
const cookieRoute = express.Router();

cookieRoute.post('/', checkCookie);

exports.cookieRoute = cookieRoute;