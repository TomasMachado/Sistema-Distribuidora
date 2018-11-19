var db = require('../../config/db');

var transporte = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
      user: 'usuario@gmail.com', // Basta dizer qual o nosso usuário
      pass: 'shhh!!'             // e a senha da nossa conta
    } 
  });


  module.exports = function(){
      this.enviarEmail = function(dados, retorno){
        var email = {
            from: 'usuario@gmail.com', // Quem enviou este e-mail
            to: dados[0].email, // Quem receberá
            subject: 'Atualização sobre sua devolução!',  // Um assunto bacana :-) 
            html: dados[0].nome + ' sua devolução está sendo processada, atualmente está na seguinte etapa: ' + dados[0].estado // O conteúdo do e-mail
          };

          transporte.sendMail(email, function(err, info){
            if(err)
              throw err; // Oops, algo de errado aconteceu.
          
            console.log('Email enviado! Leia as informações adicionais: ', info);
          });
      }
  }