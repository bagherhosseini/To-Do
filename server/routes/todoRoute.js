const express = require('express');
const { todo } = require('../controllers/todoController/todoController');
const { todoDelete } = require('../controllers/todoController/DeleteTodoController');
const todoRoute = express.Router();

todoRoute.get('/', todo);
todoRoute.delete('/', todoDelete);

exports.todoRoute = todoRoute;