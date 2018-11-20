var loginController = require('../controllers/loginController');
var devolucaoController = require('../controllers/devolucaoController');
var session = require('express-session');


var sess;

module.exports = function(app) {
  app.use(session({secret: 'ssshhhhh'}));


  app.post('/coisar', function (req, res) {
    devolucaoController.coisar(req, res);
  });

  app.get('/logout',function(req,res){
    req.session.destroy(function(err) {
      console.log('deslogado')
      if(err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    });

  });
}
