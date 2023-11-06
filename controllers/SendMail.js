const nodemailer = require("nodemailer");

const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.nodemailer_user,
    pass: process.env.nodemailer_pass,
  },
});

function sendMail(toEmail, subject, content) {
    const mailOptions  = {
        from: 'arulmurugansv2@gmail.com',
        to: toEmail,
        subject: subject,
        html: content,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('erroroccurred', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}


module.exports = { sendMail }