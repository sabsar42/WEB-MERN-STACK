const nodemailer = require("nodemailer");

const SendEmailUtility = async (EmailTo, EmailText, EmailSubject ) => {
    let transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: process.env.EMAIL_PORT,
        secure: false,
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        }, tls:{
            rejectUnauthorized: false
        },
    });

    let mailOptions ={
        from: 'Task Manager MERN <info@teamrabbil.com>',
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText,
    };

    return await transport.sendMail(mailOptions);

}

module.exports =SendEmailUtility;