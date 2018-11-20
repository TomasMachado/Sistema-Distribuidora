var db = require('../../config/db');
const nodemailer = require('nodemailer');
var $usuario = 'oltpdistribuidora@gmail.com';
var $senha = 'oltp12345';

module.exports.enviarEmail = function(dados){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: $usuario,
            pass: $senha
        }
    });

    var $destinatario = dados[0].email;

    var mailOptions = {
        from: $usuario,
        to: $destinatario,
        subject: 'Atualização sobre seu atendimento',
        text: 'Agora sua devolução está em estado de: ' + dados[0].estado,
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    });
}