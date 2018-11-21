var loginController = require('../controllers/loginController');
var devolucaoController = require('../controllers/devolucaoController');
var session = require('express-session');
var express = require('express');
var path = require('path');


var sess;

module.exports = function(app) {
  app.use(session({secret: 'ssshhhhh'}));


  app.post('/coisar', function (req, res) {
    devolucaoController.coisar(req, res);
  });

  app.get('/devolucao/:id', function (req, res) {
   var format = req.params.id;
   console.log(format);
   console.log(__dirname);
   if(!req.session.cpf){
      res.redirect('../acesso-negado');
   }else
   if(req.session.id_nivel == 0){
     //mostrar pagina
   }else{
     res.redirect('../acesso-negado', {layout:false});

   }

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
