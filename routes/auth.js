require('dotenv').config()

const { Router } = require("express");
const passport = require("passport");

const User = require('../model/user');
const {validatePassword, genPassword} = require('../utils/passwordUtils')
// const jwt = require('jsonwebtoken');

const router = Router();

// router.route("/login")
//     .post(passport.authenticate('local',{
//         successRedirect: "/",
//         failureRedirect: "/login"
//     }));

router.post("/login", passport.authenticate('local', {
    successMessage: "you have been succesfully connected",
    failureMessage: true
}), (req, res, next) => {
    res.status(200).json({redirection: "/econfirmation"});
})


// TODO: 1 do the logic here + dont forget to redirect the user into the home page (localhost::3000) not the server page (localhost:3001)
router.get("/eConfirmation/:code", (req, res, next) => {
    
})

router.route("/logout")
    .post((req, res, next) => {
        if(req.user)
            req.logOut(() => {});

        next();
    })

//TODO: replace the error response with the next cb function
//TODO: add the confirmation email here too
router.route('/register')
    .post(async (req, res, next) => {
        const {fName, lName, username, email, password} = req.body;
        const usernameExist = await User.findOne({username: username});
        if(usernameExist)
            return res.json({message: "Username Already Taken"});

        const emailExist = await User.findOne({email: email});
        if(emailExist)
            return res.json({message: "E-mail Already Taken"});

        if(!fName || !lName || !username || !email || !password)
            return res.json({message: "please provide a valid data"});

        const userSecret = genPassword(password);
        const newUser = new User({
            name:{
                fName: fName,
                lName: lName
            },
            username: username,
            email: email,
            hash: userSecret.hash,
            salt: userSecret.salt,
            created_at: new Date()
        })

        const result = await newUser.save();

        if(result.errors)
            return res.sendStatus(500);
        
        passport.authenticate('local')

        res.status(201).json({message: "Please check your email for confirmation"});
        next();
    })

module.exports = router;