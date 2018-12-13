var loginController = require('../controllers/loginController');
var manutencaoController = require('../controllers/manutencaoController');
var usuarioController = require('../controllers/usuarioController');
var session = require('express-session');
var express = require('express');
var path = require('path');


var sess;

module.exports = function(app) {
  app.use(session({secret: 'ssshhhhh'}));




  app.get('/manutencao/:id', function (req, res) {
    manutencaoController.mostrar_manutencoes(req, res);
  });


  app.get('/manutencao',function(req,res){
    if(!req.session.cpf){
      res.redirect('/login');
    }else{
        res.render('Tela_manutenção/index', { layout: false ,nome: req.session.nome, cliente : req.session.id_nivel != 0 });
        }
    });

  app.get('/manutencoes', function(req, res){
      manutencaoController.buscar_todas(req, res);
  });

  app.get('/manutencoes/:id_cliente', function(req, res){
    manutencaoController.mostrar_manutencoes(req, res);



  });
  app.post('/registrar_manutencao', function (req, res) {

      manutencaoController.inserir(req, res);
  });

}
