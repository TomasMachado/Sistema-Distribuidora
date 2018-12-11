var loginController = require('../controllers/loginController');
var devolucaoController = require('../controllers/devolucaoController');
var session = require('express-session');
var express = require('express');
var path = require('path');


var sess;

module.exports = function(app) {
  app.use(session({secret: 'ssshhhhh'}));

  app.get('/usuario',function(req,res){
        res.render('Tela_cliente/info_cliente', { layout: false, name : "name1" });
    });

  }
