var loginController = require('../controllers/loginController');
var devolucaoController = require('../controllers/devolucaoController');
var session = require('express-session');


module.exports = function(app) {

    app.get('/', function (req, res) {
      var sess = req.session;
      console.log(sess)
      if(sess.cpf){

        res.render('Tela_Principal/index_func',{ layout: false })
      }else
        res.render('Tela_Login/login', {layout: false});
    });

    app.post('/login', function (req, res) {
        loginController.realizarLogin(req, res);
    });

    app.post('/registrar_devolucao', function (req, res) {
        devolucaoController.inserir(req, res);
    });

    app.get('/devolucao',function(req,res){
          res.render('Tela_devolução/index_cliente', { layout: false, name : "name1" });
      });

    app.get('/index_cliente',verifyJWT, function(req, res){
        res.render('Tela_devolução/index_cliente',{ layout: false });
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
