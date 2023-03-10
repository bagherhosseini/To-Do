const express = require('express');
const { todo } = require('../controllers/todoController/todoController');
const todoRoute = express.Router();

todoRoute.post('/', todo);

exports.todoRoute = todoRoute;