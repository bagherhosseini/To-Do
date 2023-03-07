const express = require('express');
const { login } = require('../controllers/authController/loginController');
const { register } = require('../controllers/authController/registerController');
const authenticationRoute = express.Router();

authenticationRoute.post('/login', login);
authenticationRoute.post('/register', register);

exports.authenticationRoute = authenticationRoute;