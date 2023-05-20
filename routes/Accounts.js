require('dotenv').config()

const { Router } = require("express");
const passport = require("passport");
const jwt = require('jsonwebtoken');

const User = require('../model/user');
const { validatePassword, genPassword } = require('../utils/passwordUtils');
const { SendConfirmationEmail } = require('../utils/emailConfimationReq');

const AccountsRouter = Router();

AccountsRouter.post("/login", passport.authenticate('local', {
    successMessage: "you have been succesfully connected",
    failureMessage: true
}), (req, res, next) =>{
    const user = {
        id: req.user.id,
        name: {
            fName: req.user.name.fName,
            lName: req.user.name.lName
        },
        username: req.user.username,
        email: req.user.email,
        info: req.user.email,
        profilePic: req.user.profilePic,
        info: req.user.info,
        order_history: req.user.order_history
    }

    res.status(200).json(user);
})

AccountsRouter.route("/logout")
    .get((req, res, next) => {
        res.sendStatus(200);
        if (req.user)
            req.logout((err) => {
                if(err)
                    console.log(err);
                });
                
    })

//TODO: replace the error response with the next cb function
//TODO: add the confirmation email here too
AccountsRouter.route('/register')
    .post(async (req, res, next) => {
        const { fName, lName, username, email, password, gender } = req.body;
        const usernameExist = await User.findOne({ username: username });
        if (usernameExist)
            return res.json({ message: "Username Already Taken" });

        const emailExist = await User.findOne({ email: email });
        if (emailExist)
            return res.json({ message: "E-mail Already Taken" });

        if (!fName || !lName || !username || !email || !password || !gender)
            return res.json({ message: "please provide a valid data" });

        const userSecret = genPassword(password);
        const newUser = new User({
            name: {
                fName: fName,
                lName: lName
            },
            username: username,
            email: email,
            gender: gender,
            hash: userSecret.hash,
            salt: userSecret.salt,
            created_at: new Date()
        })

        const result = await newUser.save();

        if (result.errors)
            return res.sendStatus(500);

        res.status(201).json({ message: "Please check your email for confirmation" });
        next();
    })
    
AccountsRouter.get("/eConfirmation/:token", async (req, res, next) => {
    const token = req.params.token;
    try {
        const reqUser = jwt.verify(token, process.env.JWT_TOKEN);
        const user = await User.findOne({_id: reqUser.id});
        if(user.privacyToken.includes(token)){
            console.log("token already exist");
            throw new Error("expired Link");
        }
        
        const result = await User.findByIdAndUpdate(user.id, {confirmedEmail: true, privacyToken: [...user.privacyToken, token]});

        console.log(result);

        // res.redirect("http://localhost:3000/Email?c=true")
    } catch (err) {
        console.log(err.message);
        res.redirect("http://localhost:3000/Email");
    }
})

AccountsRouter.route('/profile-edit')
    .post(async (req, res, next) => {
        const data = req.body;

        const isValid = validatePassword(data.vrfPassword, req.user.hash, req.user.salt)

        if(!isValid)
            return res.status(401).json({message: "Unvalid password"})

        delete req.body.vrfPassword

        if(req.body.dob)
            data.dob = new Date(req.body.dob);    
        else{
            delete data.dob
        }
        
        const newData = {};
        const message = ""

        const name = {fName: data.fName, lName: data.lName}
        delete data.fName;
        delete data.lName;
        data.name = name;

        for(const property in data){
            if(property === 'name' || property === "vrfPassword")
                continue;

            if(data[property] !== req.user[property]){
                if(property === 'email'){
                    newData.confirmedEmail = false;
                    message = "email changed you will need to confirm your email"
                    SendConfirmationEmail(req.user.id);
                }
                newData[property] = data[property]
            }
        }

        if(data.name.fName !== req.user.name.fName || data.name.lName !== req.user.name.lName ){
            newData.name = data.name
        }

        // email confirmation
        if(newData.email){
        }

        const result = await User.findByIdAndUpdate(req.user.id, newData);

        console.log(result);

        const user = {
            id: result.id,
            name: {
                fName: result.name.fName,
                lName: result.name.lName
            },
            username: result.username,
            email: result.email,
            info: result.email,
            profilePic: result.profilePic,
            info: result.info,
            order_history: result.order_history
        }
        
        res.status(202).json({user, message})
    })

module.exports = AccountsRouter;