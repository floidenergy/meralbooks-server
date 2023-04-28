const express = require('express');
const mongoose = require('mongoose');

const booksRouter = require('./routes/books')

const server = express();

// server.get('/', (req, res) => {
//     res.send('hello there')
// })

server.use(express.json())

server.use('/books', booksRouter);

mongoose.connect('mongodb+srv://floid:nzzOT9SS6XDp0nL7@cluster0.h13st.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('connected to the database');
        server.listen(3001, () => console.log("listening on port 3001"));
    }).catch(err => console.log(err));
