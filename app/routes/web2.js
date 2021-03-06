var loginController = require('../controllers/loginController');
var devolucaoController = require('../controllers/devolucaoController');
var usuarioController = require('../controllers/usuarioController');
var session = require('express-session');
var express = require('express');
var path = require('path');


var sess;

module.exports = function(app) {
  app.use(session({secret: 'ssshhhhh'}));


  app.get('/usuario/:idUsuario', function(req,res){
    if(!req.session.cpf){
      res.render('Tela_Principal/acesso_negado',{layout : false});
    }else{
    sess = req.session;
    if(sess.id_nivel == 0 || sess.cpf == req.params.cpf){
      usuarioController.info_usuario(req,res);
    }else{
      res.render('Tela_Principal/acesso_negado');
    }
}
  });


  app.get('/devolucao/:id', function (req, res) {
    devolucaoController.mostrar_devolucao(req, res);
  });

  app.get('/fale-conosco', function (req, res) {
    res.render('Tela_FaleConosco/fale_conosco', {layout:false,nome: req.session.nome });
  });


  app.get('/nao-encontrado', function(req, res){
    res.render('Tela_Principal/inexistente', {layout:false,nome: req.session.nome });

  });

  app.get('/devolucoes', function(req, res){
      devolucaoController.buscar_todas(req, res);
  });

  app.get('/devolucoes/:id_cliente', function(req, res){
    devolucaoController.mostrar_devolucoes(req, res);


  })

  app.use(express.static('devolucao/public'));

  app.get('/logout',function(req,res){
    req.session.destroy(function(err) {
      console.log('deslogado')
      if(err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    });

  });
}
