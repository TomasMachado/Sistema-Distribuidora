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
    var dados = req.body;
    devolucaoModel.alterarEstado(dados,function(erro, retorno){
        if(!erro){
            devolucaoModel.buscarEspecifica(dados,function(erro, retorno){
                emailController.enviarEmail(retorno);
            });
        }
        else{
            //melhorar a verificação do erro
            console.log(erro);
        }
    });
}

module.exports.coisar = function(req, res){
    console.log('coisado');
    res.render("Tela_Login/login",{layout:false});
}

module.exports.devolucoesCliente = function(req, res){
    var dados = req.body;
    devolucaoModel.devolucoesCliente(function(dados,erro, retorno){
        if(!erro){
            res.render('index_cliente',{devolucoes: retorno});
        }
        else{
            //tratar esse erro
            console.log(erro);

        }
    });
}
