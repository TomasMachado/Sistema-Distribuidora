var devolucaoModel = require('../models/devolucaoModel')();


module.exports.inserir = function(req, res){
    var dados = req.body;
    console.log(dados)
    devolucaoModel.inserirDados(dados,function(erro, retorno){
        res.redirect('/devolucao');
    });



}
