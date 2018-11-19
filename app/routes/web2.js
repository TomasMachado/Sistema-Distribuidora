var loginController = require('../controllers/loginController');
var devolucaoController = require('../controllers/devolucaoController');
var session = require('express-session');


module.exports = function(app) {



    app.post('/coisar', function (req, res) {
        devolucaoController.coisar(req, res);
    });

}
