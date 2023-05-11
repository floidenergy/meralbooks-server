const mailer = require('nodemailer');

const SendConfirmationEmail = async (userEmail, code) =>{

    const transport = mailer.createTransport({
        // service: process.env.EMAIL_SERVICE,
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        from: `<${process.env.EMAIL_USER}>`,
        auth: {
            user: "user",
            pass: "pass"
        }
    })

    let info = await transport.sendMail({
        to: userEmail,
        subject: "MeralBOOKS E-Mail Confirmation",
        html: `
            <p>please confirm your email by clicking </p>
            <a href="http://localhost:3001/${code}>here</a>
        `
    });

    console.log("done");
    console.log(info);
}

module.exports.SendConfirmationEmail = SendConfirmationEmail;