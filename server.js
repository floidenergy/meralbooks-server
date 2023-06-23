require('dotenv').config()
const express = require('express');

const session = require("express-session");
const mongoose = require('mongoose');
const MongoStorage = require("connect-mongo");
const passport = require("passport");
const cookieParser = require('cookie-parser');

const cors = require('cors')

const AccountsRouter = require('./routes/Accounts');
const MailSubscriptionRouter = require('./routes/subscription');
const adminRouter = require('./routes/admin');

const { Logout } = require('./controllers/UserAccount/logout')


const GettersRouter = require('./routes/Getters');

const server = express();

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
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

require('./utils/passport');

server.use(passport.initialize());
server.use(passport.session());

server.get("/logout", cors({
    origin: ['http://localhost:3002', 'http://localhost:3000'],
    credentials: true
}), Logout)

// Admin related routes
server.use('/admin', cors({
    origin: 'http://localhost:3002',
    credentials: true
}), adminRouter)

// Getters router
server.use('/', GettersRouter);



server.use('/', cors({
    origin: 'http://localhost:3002',
    credentials: true,
}), AccountsRouter);
server.use('/', cors({
    origin: 'http://localhost:3002',
    credentials: true,
}), MailSubscriptionRouter);

server.get('/', (req, res, next) => {
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

mongoose.connect(process.env.DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('connected to the database');
        server.listen(3001, () => console.log("listening on port 3001"));
    }).catch(err => console.log(err));

module.exports = server;
