const express = require('express');
require('dotenv').config();
const server = express();
const cookieParser = require('cookie-parser');
const joi = require('joi');
const mysql = require('mysql2');
server.use(express.json());
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.todo = function todo(req, res) {
    const {username} = req.loggedInUser;
    console.log(username);
    res.status(200).json('successful');
}