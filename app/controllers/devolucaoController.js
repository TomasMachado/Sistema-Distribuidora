var devolucaoModel = require('../models/devolucaoModel')();
const emailController = require('./emailController');
var session = require('express-session');
var express = require('express');
var app = express();
app.use(session({secret: 'ssshhhhh'}));
var sess;




module.exports.inserir = function(req, res){
  var dados = req.body;
  console.log(dados);
  var dadosInsersao = {
    id : dados.pedido_id,
    codigo_produto : dados.produto_id,
    codigo_pedido : dados.pedido_id,
    motivo : dados.motivo,
    descricao : dados.descricao,
    cliente_id : req.session.cpf,
  }
  devolucaoModel.inserirDados(dadosInsersao,function(erro, retorno){
    if(erro){
      console.log(erro);
    }
    res.redirect('/devolucao');
  });
}

module.exports.buscar_todas = function(req, res){
  if(!req.session.cpf){
    res.render('Tela_Principal/acesso_negado', {layout : false,nome: req.session.nome });
  }
  else if(req.session.id_nivel == 0){
    console.log('>:(');
    devolucaoModel.buscarDevolucoesCompleta(function(erro, retorno){
      console.log(retorno);
      console.log('>:(');
      //Botar aqui a renderização dos dados na tabela da página
      res.render('Tela_devolucoes/devolucoes', {devolucoes: retorno, layout:false,nome: req.session.nome });
    });
  }else{
    res.redirect('/devolucoes/' + req.session.cpf);
  }
}

module.exports.alterarEstado = function(req, res){
  var dados = req.body;
  console.log(dados);
  devolucaoModel.alterarEstado(dados,function(erro, retorno){
      res.redirect('/devolucao/' + req.params.id);
    // if(!erro){
    //   devolucaoModel.buscarEspecificaEmail(dados,function(erro, retorno){
    //     //emailController.emailAlteracao(retorno);
    //   });
    // }
    // else{
    //   // TODO melhorar a verificação do erro
    //   console.log(erro);
    // }
  });
}


module.exports.devolucoesCliente = function(req, res){
  var dados = req.body;
  devolucaoModel.devolucoesCliente( dados,function(dados,erro, retorno){
    if(!erro){
      res.render('Tela_devolução/index_cliente',{devolucoes: retorno,nome: req.session.nome });
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
        res.render('Tela_Principal/inexistente', {layout : false,nome: req.session.nome });
      }else if(req.session.id_nivel == 0 || retorno[0].cliente_id == req.session.cpf){
        console.log(retorno[0]);
        res.render('Tela_devolução/devolucao_cliente', {layout : false, devolucao : retorno[0],nome: req.session.nome })
      }
      else if(retorno[0].cliente_id != req.session.cpf){
        res.render('Tela_Principal/acesso_negado', {layout : false,nome: req.session.nome });
      }
  });
}
}

module.exports.buscarUma = function(req,res){
  var format = req.params.id;
  console.log(format);
  devolucaoModel.buscarDevolucao(format, function(format, retorno){
    res.render('Tela_devolução/alterar_devolucao',{ layout: false, devolucao: retorno[0]});
  });
}


module.exports.mostrar_devolucoes = function(req, res){
  var format = req.params.id_cliente;
  console.log(format);
  if(!req.session.cpf){
    res.render('Tela_Principal/acesso_negado', {layout : false});
  }else{
    devolucaoModel.devolucoesCliente(format, function(format, retorno){
      // console.log(format);
      console.log(retorno);
      if(retorno == null || retorno.length == 0){
        res.render('Tela_Principal/inexistente', {layout : false});
      }else if(req.session.id_nivel == 0 || retorno[0].cliente_id == req.session.cpf){
        console.log(retorno[0]);
        res.render('Tela_devolução/devolucoes_cliente', {layout : false, devolucoes : retorno,nome: req.session.nome, cliente :
        req.session.cpf == format});
      }
      else if(retorno[0].cliente_id != req.session.cpf){
        res.render('Tela_Principal/acesso_negado', {layout : false});
      }
  });
}
}
