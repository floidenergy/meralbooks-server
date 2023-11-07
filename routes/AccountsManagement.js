require('dotenv').config()

const { Router } = require("express");
const passport = require("passport");

const User = require('../model/user');
const { validatePassword, genPassword } = require('../utils/passwordUtils');
const { SendConfirmationEmail } = require('../utils/emailConfimationReq');

const AccountsRouter = Router();

const { Login } = require('../controllers/UserAccount/login')
const { Register } = require('../controllers/UserAccount/register')
const { emailConfirmation } = require('../controllers/UserAccount/eConfirmation');
const { ProfileEdit } = require('../controllers/UserAccount/profileEdit')


// TODO: CHANGE THE AUTHENTIFICATION FROM /ACCOUNT/LOGIN & /ACCOUNT/REGISTER TO /AUTH/LOGIN & /AUTH/REGISTER

AccountsRouter.post("/login", passport.authenticate('local', {
    successMessage: "you have been succesfully connected",
    failureMessage: true
}), Login)

AccountsRouter.route('/register')
    .post(Register)

// email Confirmation
AccountsRouter.route("/eConfirmation")
    .post(emailConfirmation)

AccountsRouter.use((req, res, next) => {
    if (!req.user) {
        return res.sendStatus(511);
    }
    next();
});

AccountsRouter.route('/profile-edit')
    .post(ProfileEdit)

module.exports = AccountsRouter;