const express = require('express');
require('dotenv').config();
const server = express();
const cookieParser = require('cookie-parser');
const joi = require('joi');
const mysql = require('mysql2');
server.use(express.json());
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const config = {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_DATABASE
};
const pool = mysql.createPool(config);

exports.todoDelete = function todoDelete(req, res) {
    const {todoid} = req.body;
    const DeleteTodo = `DELETE FROM todolist WHERE todoid =?`;
        
    pool.execute(DeleteTodo, [todoid], (error, result) => {
        if (error) {
            res.status(500).json(error);
            return;
        } else {
            res.status(200).json('Removed successfully');
        }    
    })
}