const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

// This Part tells how the communication take place
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    post:587,
    secure: false,
    auth: {
        user: 'artofraj07@gmail.com',
        pass: 'tumchutiyathe'
    }

});


let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
            if(err){console.log('error in rendering template'); return;}

            mailHTML = template;
        }
    )

    return mailHTML;
}


module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}