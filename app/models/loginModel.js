var db = require('../../config/db');


module.exports = function(){

    this.coletarDados = function(dados,retorno){
        var con = db();
      return con.query('SELECT id, nome, password,id_nivel FROM clientes WHERE id = ?', dados.cpf,retorno);


    };

    return this;
}
