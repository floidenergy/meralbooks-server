require('dotenv').config()
const express = require('express');
// const https = require("https");
// const fs = require('fs');

const session = require("express-session");
const mongoose = require('mongoose');
const MongoStorage = require("connect-mongo");
const passport = require("passport");
const cookieParser = require('cookie-parser');

const cors = require('cors')

const AccountsRouter = require('./routes/Accounts');
const adminRouter = require('./routes/admin');
const apiRouter = require('./routes/api')

const { Logout } = require('./controllers/UserAccount/logout');



const server = express();

server.set('trust proxy', 1);

server.use(cookieParser());

server.use(express.json({ limit: '2mb' }));
server.use(express.urlencoded({ extended: false }));

// for public image sharing folders
server.use(express.static('./Uploads/Images/'))
server.use(express.static('./public'))


server.use(session({
    name: "merals.id",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MongoStorage({
        mongoUrl: process.env.DB_STRING,
        dbName: 'meralBooks',
        collectionName: 'sessions'
    }),
    cookie:
    {
        /**
         * maxAge property is in milisecond
         *  so get 1000 for a second
         *  1 second * 60 to give 1 minute
         *  1 minute * 60 to give 1 hour
         *  1 hour * 24 to give 1 day
         *  1 day * 30 to give 1 month
         */
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
        secure: true,
        sameSite: "none",
    }
}));

require('./utils/passport');

server.use(passport.initialize());
server.use(passport.session());


// Getters router
server.use('/api', cors({ origin: "*" }), apiRouter);

server.get("/logout", cors({
    origin: process.env.ALLOWED_ORIGIN.split(', '),
    credentials: true
}), Logout)

// Admin related routes
server.use('/admin', cors({
    origin: process.env.ALLOWED_ORIGIN.split(', '),
    credentials: true
}), adminRouter)

server.use('/account', cors({
    origin: process.env.ALLOWED_ORIGIN.split(', '),
    credentials: true
}), AccountsRouter);

server.get('/', cors({
    origin: '*'
}), (req, res, next) => {
    res.send('welcome to meralbooks backend server')
})

// Error handling
server.use((err, req, res, next) => {
    if (err) {
        console.log(`error: ${err.message}`);
        res.status(500).json({ message: err?.message });
    }
    next();
})

// const sslServer = https.createServer({
//     key: fs.readFileSync('./key/key.pem'),
//     cert: fs.readFileSync('./key/cert.pem')
// }, server)

// mongoose.connect(process.env.DB_STRING, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     dbName: 'test'
// })
//     .then(() => {
//         console.log('connected to the database');
//         sslServer.listen(3000, () => console.log("listening on port 3000"))
//         // server.listen(3000, () => console.log("listening on port 3000"));
//     }).catch(err => console.log(err));


module.exports.mongoose = mongoose;
module.exports.server = server;
