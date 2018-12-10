var db = require('../../config/db');
const nodemailer = require('nodemailer');
var $usuario = 'oltpdistribuidora@gmail.com';
var $senha = 'oltp12345';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: $usuario,
        pass: $senha
    }
});

module.exports.emailAlteracao = function(dados){


    var $destinatario = dados.email;

    var mailOptions = {
        from: $usuario,
        to: $destinatario,
        subject: 'Atualização sobre seu atendimento',
        text: 'Seu atendimento está em estado de: ' + dados.estado,
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    });
}


module.exports.enviarEmailCliente = function (dados) {

    var $destinatario = dados.email;

    var mailOptions = {
        from: $usuario,
        to: $destinatario,
        subject: 'Mensagem sobre seu atendimento',
        text: dados.message,
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    });

}


module.exports.enviarFaleConosco = function (dados,res) {

    var $destinatario = $usuario;

    var mailOptions = {
        from: $usuario,
        to: $destinatario,
        subject: 'Dúvida do cliente ' + dados.nome,
        text: 'mensagem: ' + dados.message + 'dados do cliente: ' + dados.nome + ' email do cliente: ' + dados.email,
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    });

}
