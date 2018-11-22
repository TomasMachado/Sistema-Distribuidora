  const mysql = require('mysql');

const con = function(){
    return mysql.createConnection({
        host:'db4free.net',
        user:'nettswork',
        password:'oltp1234',
        database:'oltp_teste'
    });
};

module.exports = con;
