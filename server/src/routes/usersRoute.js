const express = require('express');
const { getUsers } = require('../controllers/usersController/getUsersController');
const { addUser } = require('../controllers/usersController/addUsersController');
const { getRequest } = require('../controllers/usersController/getRequestController');
const { updateRequest } = require('../controllers/usersController/updateReqController');
const { getFriends } = require('../controllers/usersController/getFriendsController');
const usersRoute = express.Router();

usersRoute.get('/', getUsers);
usersRoute.post('/', addUser);
usersRoute.get('/req', getRequest);
usersRoute.put('/', updateRequest);
usersRoute.get('/friends', getFriends);

exports.usersRoute = usersRoute;