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

exports.getFriendTodoController = function getFriendTodoController(req, res) {
    try {
        const {authToken} = req.cookies;
        const {Friendusername} = req.body;

        const postSchema = joi.object(
            {
                Friendusername: joi.string().min(3).max(100).required(),
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
        const username = loggedInUserToken.username;

        if(username === Friendusername){
            res.status(400).json('Friend username is same as username');
            return;
        }

        const addTodo = `CALL GetFriendTodoList(?,?)`;
        pool.execute(addTodo, [username, Friendusername], (error, result) => {
            if (error) {
                if(error.message === "Error: You are not friends with this user"){
                    res.status(403).json("You're not friend with this user");
                    return;
                }else if(error.message === "Error: This user does not exist"){
                    res.status(404).json("This user does not exist");
                    return;
                }else{
                    res.status(500).json(error);
                    return;
                }
            }else{
                res.status(200).json(result[0]);
            }
        })

    } catch (error) { 
        res.status(401).json('Authentication error: ' + error.message);
    }
}