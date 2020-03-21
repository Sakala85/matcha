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

const insertUser = (pseudo, email, password, callBack) => {
  let sql = `SELECT * FROM user WHERE mail = "${email}" OR pseudo = "${pseudo}"`;
  db.query(sql, (err, result, data) => {
    if (err) throw err;
    if (result.length > 0) {
      return callBack("Je fais quoi", null);
    }
    sql = `INSERT INTO user (pseudo, mail , password) VALUES ('${pseudo}', '${email}', '${password}')`;
    db.query(sql, () => {});
    return callBack(null, null);
  });
};

exports.insertUser = insertUser;
