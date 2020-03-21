const mysql = require('mysql');
const express = require("express");

const router = express.Router();
// const Table = require('./createTable')

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

router.get('/createDB', (req, res) => {
    let sql = 'CREATE DATABASE matcha';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
  res.send('Database created !');
    });
});
// router.get('/createTable', Table.createTable);

module.exports = router;

