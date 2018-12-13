var db = require('../../config/db');


module.exports = function (){

    this.inserirDados = function(dados, retorno){
        var con = db();
        return con.query('insert into devolucoes set ?', dados, retorno);
      };

    this.buscarDevolucoes = function(retorno){
        var con = db();
        return con.query('select * from devolucoes', retorno);
    }

    this.alterarEstado = function(dados,retorno){
        var con = db();
        return con.query('UPDATE devolucoes SET descricao = ? WHERE id = 1',dados,retorno);
    }

    this.buscarEspecificaEmail = function(dados, retorno){
        var con = db();
        return con.query('select d.estado, c.email from cliente as c left join devolucoes as d on c.id = d.cliente_id where c.id = ?',dados, retorno);
    }

    this.buscarDevolucoesCompleta = function(retorno){
        var con = db();
        return con.query('select d.id, d.estado, d.motivo, d.descricao, c.nome from devolucoes as d  left join clientes as c on d.cliente_id = c.id',retorno);
    }


    this.devolucoesCliente = function(dados, retorno){
        var con = db();
        return con.query('select * from devolucoes where cliente_id = ?',dados,retorno);
    }

    this.buscarDevolucao = function(dados, retorno){
        var con = db();
        return con.query('select * from devolucoes where id = ?',dados,retorno);
    }

    return this;
}
