var usuarioModel = require('../models/usuarioModel')();
var session = require('express-session');
var express = require('express');
var app = express();
app.use(session({secret: 'ssshhhhh'}));
var sess;



module.exports.info_usuario = function(req, res){
  var dados = req.body;
  console.log(dados);
  usuarioModel.buscar_usuario_completo( dados,function(dados,retorno){
    if(!erro){
      console.console.log(retorno);
      res.render('Tela_devolução/index_cliente',{usuario: retorno});
    }
    else{
      //TODO tratar esse erro
      console.log(erro);

    }
  });
}
