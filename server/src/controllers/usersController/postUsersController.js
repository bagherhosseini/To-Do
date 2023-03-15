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

exports.getUsers = function getUsers(req, res) {
    const status = 1;
    
    const insertReq = `insert requests values(0, ?, ?, ?, null);`;
    pool.execute(insertReq,[usernameSen, usernameRec, status], (error, result) => {
        if (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                res.status(409).json('Username already exists');
                return;
            } else {
                res.status(500).json(error);
                return;
            }
        }

        res.status(201).json('Register successful');
    });
}