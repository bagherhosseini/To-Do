const express = require('express');
const { getUsers } = require('../controllers/usersController/getUsersController');
const { addUser } = require('../controllers/usersController/addUsersController');
const usersRoute = express.Router();

usersRoute.get('/', getUsers);
usersRoute.post('/', addUser);

exports.usersRoute = usersRoute;