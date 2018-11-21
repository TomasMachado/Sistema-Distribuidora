var loginController = require('../controllers/loginController');
var devolucaoController = require('../controllers/devolucaoController');
var session = require('express-session');
var express = require('express');
var path = require('path');


var sess;

module.exports = function(app) {
  app.use(session({secret: 'ssshhhhh'}));


  app.get('/usuario/:cpf', function(req,res){
    if(! req.session.cpf){
      res.redirect('../acesso-negado');
    }else
    sess = req.session;
    if(sess.id_nivel == 0){
      //TODO mostrar pagina
    }else if(sess.cpf == req.params.cpf){
      //TODO mostrar pagina
    }else{
      res.redirect('../acesso-negado');
    }

  });

  app.post('/coisar', function (req, res) {
    devolucaoController.coisar(req, res);
  });

  app.get('/devolucao/:id', function (req, res) {
    devolucaoController.mostrar_devolucao(req, res);
  });

  app.get('/acesso-negado', function(req, res){
    res.render('Tela_Principal/acesso_negado', {layout:false});

  });

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
