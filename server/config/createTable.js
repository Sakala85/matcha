const HttpError = require("../models/http-error");

const mysql = require('mysql');
const express = require("express");

const router = express.Router();

//Create Connection
const db = mysql.createConnection({
    host:'localhost',
    user:'matcha',
    password:'ggtrggty',
    database: 'matcha'
});

//Connect
db.connect((err) => {
    if(err) {
        throw err;
    }
});


const createTable = (req, res, next) => {
  let sql = 'CREATE TABLE user(id int AUTO_INCREMENT, pseudo VARCHAR(255), mail VARCHAR(255), password VARCHAR(255), PRIMARY KEY (id))';
  db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('User Table Created');
  })
};

exports.createTable = createTable;
