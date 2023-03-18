const express = require('express');
require('dotenv').config();
const server = express();
const cookieParser = require('cookie-parser');
const joi = require('joi');
const mysql = require('mysql2');
server.use(express.json());
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET;

const config = {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_DATABASE
};
const pool = mysql.createPool(config);

exports.login = function login(req, res) {
    const {username, password} = req.body;

    const postSchema = joi.object(
        {
            username: joi.string().min(3).max(20).required(),
            password: joi.string().min(3).max(30).required()
        }
    )

    const isValid = postSchema.validate(req.body);

    if (isValid.error) {
        res.status(400).json(isValid.error.details[0].message);
        return;
    }

    const getPassword = `SELECT password FROM users WHERE username=?`;

    pool.execute(getPassword,[username], (error, result) => {
        if (error) {
            res.status(500).json(error);
            return;
        } else { 
            
            if(result.length === 0){
                res.status(401).json('Invalid login credentials');
                return;
            }

            const storedPassword = result[0].password;
            const isEqual = bcrypt.compareSync(password, storedPassword)
            if(!isEqual){
                res.status(401).json('Invalid login credentials');
                return;
            }
            
            const authToken = jwt.sign({username}, secret, {expiresIn: 120});
            res.cookie('authToken', authToken, {
                // expires: new Date('9999-12-31'),
                maxAge: 3600000,
                sameSite: 'none',
                // Secure är just nu buggat för Postman, använd inte secure: true för Postman.
                secure: true,
                httpOnly: false
            });

            res.status(200).json('Login successful');
        }
    });
}