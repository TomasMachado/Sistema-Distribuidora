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
      res.redirect('../acesso-negado',{ layout: false , nome: req.session.nome});
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


  app.get('/devolucao/:id', function (req, res) {
    devolucaoController.mostrar_devolucao(req, res);
  });

  app.get('/fale-conosco', function (req, res) {
    res.render('Tela_FaleConosco/fale_conosco', {layout:false});
  });


  app.get('/nao-encontrado', function(req, res){
    res.render('Tela_Principal/inexistente', {layout:false});

  });

  app.get('/devolucoes', function(req, res){
      devolucaoController.buscar_todas(req, res);
  });

  app.get('/devolucoes/:id_cliente', function(){
    //TODO ver todas devolucoes do cliente


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
