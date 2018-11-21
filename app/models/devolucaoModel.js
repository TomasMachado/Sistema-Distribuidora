var db = require('../../config/db');


module.exports = function (){

    this.inserirDados = function(dados, retorno){
        var con = db();
        return con.query('insert into devolucoes set ?', dados, retorno);
      };

    this.buscarDevolucoes = function(dados, retorno){
        var con = db();
        return con.query('select * from devolucoes', retorno);
    }

    this.alterarEstado = function(dados,retorno){
        var con = db();
        return con.query('UPDATE devolucoes SET estado = ? WHERE devolucao_id = ? ',dados,retorno);
    }

    this.buscarEspecifica = function(dados, retorno){
        var con = db();
        console.log(dados)
        return con.query('select * from devolucoes where id = ?',dados, retorno);
    }

    this.devolucoesCliente = function(dados, retorno){
        var con = db();
        return con.query('select * from devolucoes where cliente_id = ?',dados,retorno);
    }
    return this;
}
