const mysql = require('mysql');

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

module.exports = db;