const nodeMailer = require('../config/nodemailer');
exports.reset_pass = (token) => {
    nodeMailer.transporter.sendMail({
            from: '463ayush@gmail.com',
            to: token.user.email,
            subject: 'SocialBox | Link to reset password',
            html: `
            <h3>Following is the link to reset your password. Please do not share it with anyone.</h3>
            <p>http://localhost:8000/reset_password/reset/?access_token=${token.access_token}</p><br>
            <p>Kindly click on the above link to change your password.</p>`
        },
        (error, info) => {
            if (error) {
                console.log('error in sending email!', error);
                return;
            }
            console.log('mail delivered!', info);
            return;
        }
    )
}