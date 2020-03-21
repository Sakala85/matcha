const HttpError = require("../models/http-error");

const mysql = require("mysql");
const express = require("express");

const router = express.Router();

//Create Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "matcha",
  password: "ggtrggty",
  database: "matcha"
});

//Connect
db.connect(err => {
  if (err) {
    throw err;
  }
});

const insertUser = (req, res, next) => {
  const { pseudo, email, password } = req.body;
  let sql = `SELECT * FROM user WHERE mail = "${email}" OR pseudo = "${pseudo}"`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length < 1) {
      sql = `INSERT INTO user (pseudo, mail , password) VALUES ('${pseudo}', '${email}', '${password}')`;
      db.query(sql, (err, result) => {
        if (err) throw err;
      });
    } else {
      return '';
    }
    return (true);
  });
};

exports.insertUser = insertUser;
