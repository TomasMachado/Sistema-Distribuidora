  const mysql = require('mysql');

const con = function(){
    return mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'password',
        database:'oltp'
    });
};

module.exports = con;
