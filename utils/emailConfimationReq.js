require('dotenv').config
const mailer = require('nodemailer');
const jwt = require('jsonwebtoken')
const UserModel = require('../model/user');

const SendConfirmationEmail = async (user_id, type) => {
    const User = await UserModel.findById(user_id)
    
    if(!User)
        throw new Error("no user Found");

    const userObj = {id: User.id, name: User.name, type: type};

    const token = jwt.sign(userObj, process.env.JWT_TOKEN, {
        expiresIn: "30min",
    });

    return await SendEmail(User.email, token);
}

const SendEmail = async (userEmail, code) =>{

    const transport = mailer.createTransport({
        // service: process.env.EMAIL_SERVICE,
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        from: `<${process.env.EMAIL_USER}>`,
        
    })

    let info = await transport.sendMail({
        to: userEmail,
        subject: "MeralBOOKS E-Mail Confirmation",
        html: `
            <p>please confirm your email by clicking </p>
            <a href="http://localhost:3000/email?token=${code}" >here</a>
        `
    });

    return info;
}

module.exports.SendConfirmationEmail = SendConfirmationEmail;
