const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    database:'pharmacy',
    user:'root',
    password:'9581836001Bhaga1234!',
});

module.exports = connection;