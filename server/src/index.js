const express = require('express');
require('dotenv').config();
const server = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const joi = require('joi');
const mysql = require('mysql2');
server.use(express.json());

const { authenticationRoute } = require('./routes/authRoute');
const { todoRoute } = require('./routes/todoRoute');
const { usersRoute } = require('./routes/usersRoute');
const { friendRoute } = require('./routes/friendRoute');
const { cookieRoute } = require('./routes/cookieRoute');
const { checkAuth } = require('./middlewares/checkAuthMiddleware');

// express.json() gör samma sak som vi gjorde i våran egna middleware.
server.use(express.json());
server.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
server.use(cookieParser());

server.use('/auth',authenticationRoute);
server.use('/checkCookie', cookieRoute);
server.use('/todo', checkAuth, todoRoute);
server.use('/users', checkAuth, usersRoute);
server.use('/friend', checkAuth, friendRoute);

server.listen(5050);