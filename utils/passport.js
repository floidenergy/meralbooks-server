/** @format */

const passport = require("passport");
const express = require("express");
const LocalStrategy = require("passport-local");

const User = require("../model/user");
const { validatePassword } = require("./passwordUtils");
const {SendConfirmationEmail} = require('./emailConfimationReq');

passport.use(
    new LocalStrategy(async (username, password, done) => {
        const resultUser = await User.findOne({
            $or: [{ username: username }, { email: username }],
        });

        if (!resultUser) {
            // user is invalid
            return done(
                { message: "Invalid Credentials" },
                false,
                "Invalid Credentials"
            );
        }

        if (validatePassword(password, resultUser.hash, resultUser.salt)) {
            // user found

            // TODO: enable this after you impliment the email confimation ---> 
            if (!resultUser.confirmedEmail){
                
                const confirmationCode = "123456789";
                
                SendConfirmationEmail(resultUser.email, confirmationCode);
                
                return done(
                    { message: "Please Confirm Your Email" },
                    false,
                    "Please Confirm Your E-mail"
                   );
            }
                    
            return done(null, resultUser);
        } else
            return done(
                { message: "Invalid Credentials" },
                false,
                "Invalid Credentials"
            );
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userID, done) => {
    User.findById(userID)
        .then((user) => done(null, user))
        .catch((err) => done(err));
});
