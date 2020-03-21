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
    let sql = 'CREATE TABLE user(id int AUTO_INCREMENT, username VARCHAR(255), mail VARCHAR(255), password VARCHAR(255), PRIMARY KEY (id), firstname varchar(255) NOT NULL, lastname varchar(255) NOT NULL, token varchar(255) NOT NULL, valid_profil tinyint(1) DEFAULT 0, valid_mail tinyint(1) DEFAULT 0, genre varchar(255) DEFAULT NULL, orientation varchar(255) DEFAULT NULL, bio text, popularity varchar(255) DEFAULT NULL, last_visit datetime DEFAULT NULL, age int(11) DEFAULT NULL, latitude varchar(255) DEFAULT NULL, longitude varchar(255) DEFAULT NULL, picture1 varchar(1000) DEFAULT NULL, picture2 varchar(1000) DEFAULT NULL, picture3 varchar(1000) DEFAULT NULL, picture4 varchar(1000) DEFAULT NULL, picture5 varchar(1000) DEFAULT NULL)';
  db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('User Table Created');
  })
};

exports.createTable = createTable;
