const nodeMailer = require('../config/nodemailer');


exports.newComment = (comment) => {
    console.log('inside newComment mailer');

    nodeMailer.transporter.sendMail({
        from: 'artofraj07@gmail.com',
        // mail will send to user who is commenting from artofraj07 mail
        to: comment.user.email,
        subject: "New Comment Published!",
        html: '<h1>Yup, your comment is now published!</h1>'
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
    });
}