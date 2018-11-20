module.exports = function(){
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
    var express = require('express');
    var session = require('express-session');
    var bodyParser = require('body-parser');
    var expressValidator = require('express-validator');
    var expressLayouts = require('express-ejs-layouts');
    var cookieParser = require('cookie-parser');
    var logger = require('morgan');
    const helmet = require('helmet');
    const nodemailer = require('nodemailer');




    var app = express();
    app.use(session({secret: 'ssshhhhh'}));
    app.set('view engine','ejs');
    app.set("view options", { layout: false });
    app.set('views','./app/views');

    app.use(bodyParser.json()); // support json encoded bodies
    app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
    app.use(logger('dev'));
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());

    app.use(expressLayouts)          // Definimos que vamos utilizar o express-ejs-layouts na nossa aplicação

    app.use(express.static('public'));

    app.use(expressValidator());

    var rotas = require('../app/routes/web');
    rotas(app);
    var rotas2 = require('../app/routes/web2');
    rotas2(app);

    app.listen(8000,function(){
      console.log("localhost:8000");
    });




  };
