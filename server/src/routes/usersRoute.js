const express = require('express');
const { getUsers } = require('../controllers/usersController/getUsersController');
// const { addTodo } = require('../controllers/todoController/addTodoController');
// const { todoDelete } = require('../controllers/todoController/DeleteTodoController');
// const { updateTodo } = require('../controllers/todoController/updateTodoController');
const usersRoute = express.Router();

usersRoute.get('/', getUsers);
// usersRoute.post('/', addTodo);
// usersRoute.delete('/', todoDelete);
// usersRoute.put('/', updateTodo);

exports.usersRoute = usersRoute;