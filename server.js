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
const AutherRouter = require('./routes/Authors');

const server = express();

server.use(cookieParser());

server.use(express.json({ limit: '2mb' }));
server.use(express.urlencoded({ extended: false }));

// for image sharing folders
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

server.use('/admin', cors({
    origin: 'http://localhost:3002',
    credentials: true
}), adminRouter)


server.use(cors({
    origin: '*'
}));

server.use('/', AutherRouter)


server.use(cors({
    origin: 'http://localhost:3002',
    credentials: true,
}));

server.use('/', AccountsRouter);
server.use('/', MailSubscriptionRouter);

// Error handling
server.use((err, req, res, next) => {
    if (err) {
        console.log(`error: ${err}`);
        res.status(500);
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
