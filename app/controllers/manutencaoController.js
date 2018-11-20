var manutencaoModel = require('../models/manutencaoModel')();

module.exports.inserir = function (res, req) {
    var dados = req.body;
    manutencaoModel.inserirDados(dados,function (erro, retorno) {
       if(!erro){
           console.log('dados inseridos');
       }
       else{
           console.log(erro);
       }
    });

    module.exports.buscarTodas = function(req, res){
        manutencaoModel.buscarManutencoes(function(erro, retorno){
            //Botar aqui a renderização dos dados na tabela da página
            return retorno;
        });
    }

    module.exports.alterarEstado = function(req, res){
        var dados = req.body;
        manutencaoModel.alterarEstado(dados,function(erro, retorno){
            if(!erro){
                manutencaoModel.buscarEspecifica(dados,function(erro, retorno){
                    emailController.emailAlteracao(retorno);
                });
            }
            else{
                //melhorar a verificação do erro
                console.log(erro);
            }
        });
    }


    module.exports.devolucoesCliente = function(req, res){
        var dados = req.body;
        manutencaoModel.manutencoesCliente(dados,function(dados,erro, retorno){
            if(!erro){
                res.render('index_cliente',{manutencoes: retorno});
            }
            else{
                //tratar esse erro
                console.log(erro);

            }
        });
    }


}