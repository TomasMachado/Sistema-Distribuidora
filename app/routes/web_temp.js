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


  app.get('/testetela', function(req,res){
    res.render('Tela_devolução/alterar_devolucao',{ layout: false,
       devolucao: { id: 1, motivo:"teste", estado: "teste", descricao: "teste"}});
  })

  app.get('/testetela/:id', function(req,res){
      devolucaoController.buscarUma(req,res);
  })

  app.post('/testetela/:id', function(req,res){
    devolucaoController.alterarEstado(req,res);

    console.log("foi");
  } )


  }
