var db = require('../../config/db');

module.exports = function (){

  this.buscar_usuario_completo = function(dados, retorno){
      var con = db();
      return con.query('select * from clientes where cpf = ?',dados, retorno);
  }
}
