require('dotenv').config()
const express = require('express');

const session = require("express-session");
const mongoose = require('mongoose');
const MongoStorage = require("connect-mongo");
const passport = require("passport");
const cookiePaerser = require('cookie-parser')

const cors = require('cors')

const booksRouter = require('./routes/books')
const AccountsRouter = require('./routes/Accounts');

const server = express();

server.use(cookiePaerser());

server.use(express.json({limit: '20mb'}));
server.use(express.urlencoded({extended: false}));

server.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

server.use(session({
    name: "merals.id",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MongoStorage({
        mongoUrl: process.env.DB_STRING,
        dbName: 'test',
        collectionName: 'sessions'
    }),
    cookie:{
        maxAge: 1000 * 60 * 60 * 24
    }
}));

require('./utils/passport');

server.use(passport.initialize());
server.use(passport.session());


server.use('/', booksRouter);
server.use('/', AccountsRouter);

server.use((req, res, next) => {
    // if(req.user)
    //     console.log(req.cookies);

    next();
})
server.get("/", (req, res) => res.json({message: 'welcome to meralbooks back end server'}));

server.use((err, req, res, next) => {
    if(err){
        console.log(err);
        res.status(400).json(err);
    }
    next();
})

// server.get("/conf", async (req, res) => {
//     const result = await confirmation("user@gmail.com", "aaaaaaaaaaaaa");
//     res.json(result);
// })

mongoose.connect(process.env.DB_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('connected to the database');
        server.listen(3001, () => console.log("listening on port 3001"));
    }).catch(err => console.log(err));
