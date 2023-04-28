const {Schema, model} = require('mongoose');

const bookSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    quantity:{
        type: Number,
        require: true
    },
    author:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true
    }
});

module.exports = model('Books', bookSchema)