const mysql = require('mysql');

const con = function(){
    return mysql.createConnection({
        host:'179.218.106.169',
        user:'root',
        password:'password',
        database:'oltp',
        port:'60'
    });
};
module.exports = con;
