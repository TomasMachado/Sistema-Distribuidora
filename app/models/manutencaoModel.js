var db = require('../../config/db');

module.exports = function () {

    this.inserirDados = function(dados,retorno){
        var con = db();
        return con.query('insert into manutencoes ?',dados);
    }

    this.buscarManutencoes = function(retorno){
        var con = db();
        return con.query('select * from manutencoes');
    }

    this.alterarEstado = function(dados, retorno){
        var con = db();
        return  con.query('update manutencoes set estado = ? where id = ?',dados, retorno);

    }

    this.manutencoesCliente = function(dados, retorno){
        var con = db();
        return con.query('select * from manutencoes where cliente_id = ?',dados, retorno);
    }

    this.buscarEspecifica = function(dados, retorno){
        var con = db();
        return con.query('select m.estado, c.email from cliente as c left join manutencoes as m on c.id = m.cliente_id where c.id = ?',dados, retorno);
    }


    return this;

}

