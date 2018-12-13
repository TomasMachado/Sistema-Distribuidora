var loginController = require('../controllers/loginController');
var devolucaoController = require('../controllers/devolucaoController');
var emailController = require('../controllers/emailController');
var usuarioController = require('../controllers/usuarioController');
var session = require('express-session');


module.exports = function(app) {


  app.get('/*', function (req, res,next) {
    var sess = req.session;
    req.nome = sess.nome;
    next();

  });

    //TODO verificar se é funcionario
    app.get('/', function (req, res) {
      var sess = req.session;
      console.log(sess)
      if(sess.cpf ){
        if(sess.id_nivel == 0){
          res.render('Tela_Principal/index_func',{ layout: false , nome: sess.nome})}
        else {
          res.render('Tela_Principal/index_cliente',{ layout: false , nome: sess.nome})

        }
      }else
        res.render('Tela_Principal/pagina_deslogada', {layout: false});
    });

    app.get('/login', function (req, res) {
      var sess = req.session;
      console.log(sess)
      //usuario logado
      if(sess.cpf){
        res.redirect('/');
      }else{
        res.render('Tela_Login/login', {layout:false});
      }
    });

    app.post('/login', function (req, res) {
        loginController.realizarLogin(req, res);
    });

    app.post('/faleconosco', function(req, res){
        var dados = req.body;
        emailController.enviarFaleConosco(dados);
    });

    app.post('/registrar_devolucao', function (req, res) {

        devolucaoController.inserir(req, res);
    });

    app.get('/devolucao',function(req,res){
      if(!req.session.cpf){
        res.redirect('/login');
      }else{
          res.render('Tela_devolução/index_cliente', { layout: false ,nome: req.session.nome, cliente : req.session.id_nivel != 0 });
          }
      });

      app.get('/meu-perfil',function(req,res){
        if(!req.session.cpf){
          res.redirect('/login');
        }else{
           req.params.idUsuario = req.session.cpf;
              usuarioController.info_usuario(req,res);
            }
        });

    function verifyJWT(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (!token) return res.status(401).send({auth: false, message: 'No token provided.'});

        jwt.verify(token, process.env.SECRET, function (err, decoded) {
            if (err) return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});

            // se tudo estiver ok, salva no request para uso posterior
            req.userId = decoded.id;
            next();
        });
    }
}
