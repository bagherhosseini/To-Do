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

exports.getRequest = function getRequest(req, res) {

    try {
        const {authToken} = req.cookies;

        // Verifierear tokenen.
        const loggedInUserToken = jwt.verify(authToken, secret);
        if(!loggedInUserToken){
            res.status(401).json('Token not found');
            return;
        }
        const username = loggedInUserToken.username;

        const getRequest = `SELECT * FROM requests WHERE requestreceiver =? and status = 1`;

        pool.execute(getRequest, [username], (error, result) => {
            if (error) {
                res.status(500).json(error);
                return;
            }

            res.status(200).json(result);
        })

    } catch (error) { 
        res.status(401).json('Authentication error: ' + error.message);
    }
}