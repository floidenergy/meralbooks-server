require('dotenv').config()

const { Router } = require("express");
const passport = require("passport");

const User = require('../model/user');
const { validatePassword, genPassword } = require('../utils/passwordUtils');
const { SendConfirmationEmail } = require('../utils/emailConfimationReq');

const AccountsRouter = Router();

const { Login } = require('../controllers/UserAccount/login')
const { Logout } = require('../controllers/UserAccount/logout')
const { Register } = require('../controllers/UserAccount/register')
const { emailConfirmation } = require('../controllers/UserAccount/eConfirmation');
const { ProfileEdit } = require('../controllers/UserAccount/profileEdit')

AccountsRouter.post("/login", passport.authenticate('local', {
    successMessage: "you have been succesfully connected",
    failureMessage: true
}), Login)

AccountsRouter.route("/logout")
    .get(Logout)

//TODO: replace the error response with the next cb function
//TODO: add the confirmation email here too
AccountsRouter.route('/register')
    .post(Register)

// email Confirmation
AccountsRouter.route("/eConfirmation")
    .post(emailConfirmation)


AccountsRouter.route('/profile-edit')
    .post(ProfileEdit)

module.exports = AccountsRouter;