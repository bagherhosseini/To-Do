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

exports.updateRequest = function updateRequest(req, res) {
    try {
        const {reqid} = req.body;
        
        const postSchema = joi.object(
            {
                reqid: joi.number().max(100).required()
            }
        )
    
        const isValid = postSchema.validate(req.body);
    
        if (isValid.error) {
            res.status(400).json(isValid.error.details[0].message);
            return;
        }
        const updateTodo = `UPDATE requests SET status = 2 WHERE requestid = ?`;
        
        pool.execute(updateTodo, [reqid], (error, result) => {
            if (error) {
                res.status(500).json(error);
                return;
            } else {
                res.status(200).json('Updated successfully');
            }    
        })

    } catch (error) { 
        res.status(401).json('Authentication error: ' + error.message);
    }
}