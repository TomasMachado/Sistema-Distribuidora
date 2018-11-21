var devolucaoModel = require('../models/devolucaoModel')();
const emailController = require('./emailController');


module.exports.inserir = function(req, res){
  var dados = req.body;
  console.log(dados)
  devolucaoModel.inserirDados(dados,function(erro, retorno){
    res.redirect('/devolucao');
  });
}

module.exports.buscarTodas = function(req, res){
  devolucaoModel.buscarDevolucoes(function(erro, retorno){
    //Botar aqui a renderização dos dados na tabela da página
    return retorno;
  });
}

module.exports.alterarEstado = function(req, res){
<<<<<<< HEAD
  var dados = req.body;
  devolucaoModel.alterarEstado(dados,function(erro, retorno){
    if(!erro){
      devolucaoModel.buscarEspecifica(dados,function(erro, retorno){
        emailController.emailAlteracao(retorno);
      });
    }
    else{
      //melhorar a verificação do erro
      console.log(erro);
    }
  });
=======
    var dados = req.body;
    devolucaoModel.alterarEstado(dados,function(erro, retorno){
        if(!erro){
            devolucaoModel.buscarEspecificaEmail(dados,function(erro, retorno){
                emailController.emailAlteracao(retorno);
            });
        }
        else{
            //melhorar a verificação do erro
            console.log(erro);
        }
    });
>>>>>>> 38303f1053020a989e49e42038af0af502e60643
}

module.exports.coisar = function(req, res){
  console.log('coisado');
  res.render("Tela_Login/login",{layout:false});
}

module.exports.devolucoesCliente = function(req, res){
  var dados = req.body;
  devolucaoModel.devolucoesCliente( dados,function(dados,erro, retorno){
    if(!erro){
      res.render('index_cliente',{devolucoes: retorno});
    }
    else{
      //tratar esse erro
      console.log(erro);

    }
  });
}
  module.exports.mostrar_devolucao = function(req, res){
    var format = req.params.id;
    console.log(format);
    if(!req.session.cpf){
      res.redirect('../acesso-negado');
    }else
    devolucaoModel.buscarEspecifica(format,function(format, retorno){
      console.log(retorno);
      if(retorno == null || retorno.length == 0){
        //TODO 404 not found
      }else if(retorno[0].cliente_id != req.session.cpf){
        res.redirect('../acesso-negado');
      }else{
        //TODO mostrar dev
        res.redirect('../');
      }
    });


  }
