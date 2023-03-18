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

exports.addTodo = function addTodo(req, res) {
    try {
        const {authToken} = req.cookies;
        const {title} = req.body;

        // Verifierear tokenen.
        const loggedInUserToken = jwt.verify(authToken, secret);
        if(!loggedInUserToken){
            res.status(401).json('Token not found');
            return;
        }
                
        const postSchema = joi.object(
            {
                title: joi.string().min(3).required()
            }
        )
        const isValid = postSchema.validate(req.body);
        if (isValid.error) {
            res.status(400).json(isValid.error.details[0].message);
            return;
        }

        const username = loggedInUserToken.username;
        const addTodo = `insert todolist values(0, ?, ?)`;
        
        pool.execute(addTodo, [username, title], (error, result) => {
            if (error) {
                res.status(500).json(error);
                return;
            } else {
                res.status(201).json('added successfully');
            }    
        })

    } catch (error) { 
        res.status(401).json('Authentication error: ' + error.message);
    }
}