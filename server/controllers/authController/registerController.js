const express = require('express');
require('dotenv').config();
const server = express();
const cookieParser = require('cookie-parser');
const joi = require('joi');
const mysql = require('mysql2');
server.use(express.json());
const bcrypt = require('bcrypt');

const config = {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_DATABASE
};

const pool = mysql.createPool(config);

exports.register = function register(req, res) {
    const {name, username, password} = req.body;

    const postSchema = joi.object(
        {
            name: joi.string().min(3).max(20).required(),
            username: joi.string().min(3).max(20).required(),
            password: joi.string().min(3).max(30).required()
        }
    )

    const isValid = postSchema.validate(req.body);

    if (isValid.error) {
        res.status(400).json(isValid.error.details[0].message);
        return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const sqlInsert = `insert users values(0, ?, ?, ?);`;

    pool.execute(sqlInsert,[name, username, hashedPassword], (error, result) => {
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