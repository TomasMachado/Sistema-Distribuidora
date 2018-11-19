var loginModel = require('../models/loginModel')();
var session = require('express-session');
var express = require('express');
var app = express();
app.use(session({secret: 'ssshhhhh'}));
var sess;


module.exports.realizarLogin = function(req, res){
    var dados = req.body;
    console.log(dados);

    loginModel.coletarDados(dados,function (erro, retorno){
      sess = req.session;
        console.log(retorno);
        if(retorno == null){
          console.log('banco fora do ar');
          res.render('Tela_Login/login',{ layout: false , erro:'Banco fora do ar'});
        }else
        if(retorno.length > 0){
            if(dados.password == retorno[0].password){
              sess.cpf = dados.cpf;
                if(retorno[0].id_nivel == 1){
                    const id = retorno[0].cpf;
                    //renderizar página de cliente
                    res.render('Tela_devolução/index_cliente',{token: token, layout: false });
                }
                else{
                    res.render('Tela_Principal/index_func',{ layout: false });
                }
            }
            else{
                // alert("Senha incorreta");
                res.render('Tela_Login/login',{ layout: false, erro:"Senha incorreta"});
            }
        }
        else{
            // alert("CPF não registrado");
            res.render('Tela_Login/login',{ layout: false , erro: "CPF não registrado"});
        }

    })

}
