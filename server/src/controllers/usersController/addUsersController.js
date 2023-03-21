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

exports.addUser = function addUser(req, res) {
    try {
        const { usernameRec } = req.body;
        const {authToken} = req.cookies;
        const status = 1;

        const postSchema = joi.object(
            {
                usernameRec: joi.string().min(3).max(100).required()
            }
        )
    
        const isValid = postSchema.validate(req.body);
    
        if (isValid.error) {
            res.status(400).json(isValid.error.details[0].message);
            return;
        }

        // Verifierear tokenen.
        const loggedInUserToken = jwt.verify(authToken, secret);
        if(!loggedInUserToken){
            res.status(401).json('Token not found');
            return;
        }
        const usernameSen = loggedInUserToken.username;

        const insertReq = `insert requests values(0, ?, ?, ?);`;
        pool.execute(insertReq,[usernameSen, usernameRec, status], (error, result) => {
            if (error) {
                if(error.code === 'ER_DUP_ENTRY'){
                    res.status(409).json("You have already sent a request to this user");
                    return;
                }else if(error.message === "Error: A request between these users already exists in either direction"){
                    res.status(409).json("This user have already sent a request to you");
                    return;
                }
                res.status(500).json(error);
                return;
            }
    
            res.status(201).json('added successfuly');
        });

    } catch (error) { 
        res.status(401).json('Authentication error: ' + error.message);
    }
}