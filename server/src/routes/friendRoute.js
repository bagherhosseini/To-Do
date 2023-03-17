const express = require('express');
const { getFriendTodoController } = require('../controllers/friendTodo/getFriendTodoController');
const friendRoute = express.Router();

friendRoute.post('/', getFriendTodoController);

exports.friendRoute = friendRoute;