var usuarioModel = require('../models/usuarioModel')();
var session = require('express-session');
var express = require('express');
var app = express();
app.use(session({secret: 'ssshhhhh'}));
var sess;



module.exports.info_usuario = function(req, res){
  var dados = req.params.idUsuario;
  console.log(dados);
  usuarioModel.buscar_usuario_completo( dados,function(erro,retorno){
    if(retorno[0] == null){
      res.render('Tela_Principal/inexistente', {layout : false});
    }else
    if(!erro){
      console.log(retorno[0]);
      res.render('Tela_cliente/info_cliente',{layout:false, usuario: retorno[0],nome: req.session.nome });
    }
    else{
      //TODO tratar esse erro
      console.log(erro);

    }
  });
}
