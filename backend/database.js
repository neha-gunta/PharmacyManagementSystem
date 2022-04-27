const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    database:'pharmacy',
    user:'root',
    password:'password',
});

module.exports = connection;