var devolucaoModel = require('../models/devolucaoModel')();
const emailController = require('./emailController');
var session = require('express-session');
var express = require('express');
var app = express();
app.use(session({secret: 'ssshhhhh'}));
var sess;




module.exports.inserir = function(req, res){
  var dados = req.body;
  console.log(dados)
  devolucaoModel.inserirDados(dados,function(erro, retorno){
    res.redirect('/devolucao');
  });
}

module.exports.buscar_todas = function(req, res){
  if(!req.session.cpf){
    res.render('Tela_Principal/acesso_negado', {layout : false});
  }
  else if(req.session.id_nivel == 0){
    console.log('>:(');
    devolucaoModel.buscarDevolucoes(function(erro, retorno){
      console.log(retorno);
      console.log('>:(');
      //Botar aqui a renderização dos dados na tabela da página
      res.render('Tela_devolucoes/devolucoes', {devolucoes: retorno, layout:false});
    });
  }else{
    res.render('Tela_Principal/acesso_negado', {layout : false});
  }
}

module.exports.alterarEstado = function(req, res){
  var dados = req.body;
  devolucaoModel.alterarEstado(dados,function(erro, retorno){
    if(!erro){
      devolucaoModel.buscarEspecificaEmail(dados,function(erro, retorno){
        emailController.emailAlteracao(retorno);
      });
    }
    else{
      // TODO melhorar a verificação do erro
      console.log(erro);
    }
  });
}


module.exports.devolucoesCliente = function(req, res){
  var dados = req.body;
  devolucaoModel.devolucoesCliente( dados,function(dados,erro, retorno){
    if(!erro){
      res.render('index_cliente',{devolucoes: retorno});
    }
    else{
      //TODO tratar esse erro
      console.log(erro);

    }
  });
}
module.exports.mostrar_devolucao = function(req, res){
  var format = req.params.id;
  if(!req.session.cpf){
    res.render('Tela_Principal/acesso_negado', {layout : false});
  }else{
    devolucaoModel.buscarDevolucao(format,function(format, retorno){
      console.log(retorno);
      if(retorno == null || retorno.length == 0){
        res.render('Tela_Principal/inexistente');
      }else if(req.session.id_nivel == 0 || retorno[0].cliente_id == req.session.cpf){
        console.log(retorno[0]);
        res.render('Tela_devolução/devolucao', {layout : false, devolucao : retorno[0]})
      }
      else if(retorno[0].cliente_id != req.session.cpf){
        res.render('Tela_Principal/acesso_negado', {layout : false});
      }
  });
}
}
