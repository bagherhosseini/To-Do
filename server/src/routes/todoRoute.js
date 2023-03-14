const express = require('express');
const { addTodo } = require('../controllers/todoController/addTodoController');
const { todo } = require('../controllers/todoController/todoController');
const { todoDelete } = require('../controllers/todoController/DeleteTodoController');
const { updateTodo } = require('../controllers/todoController/updateTodoController');
const todoRoute = express.Router();

todoRoute.post('/', addTodo);
todoRoute.get('/', todo);
todoRoute.delete('/', todoDelete);
todoRoute.put('/', updateTodo);

exports.todoRoute = todoRoute;