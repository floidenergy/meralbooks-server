const {Schema, model} = require('mongoose');

const bookSchema = new Schema({
    img:{
        type: String,
        require: true
    },
    name:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    author:{
        type: {
            name:{
                type: String,
                require: true
            },
            id: {
                type: String,
                required: true
            }
        },
        required: true
    },
    price:{
        type: Number,
        require: true
    },
    quantity:{
        type: Number,
        require: true
    },
    language:{
        type: String,
        require: true
    },
    category:{
        type: {
            id: {
                type: String,
                require: true
            }
        },
        require: true
    },
    availablity:{
        type: Boolean,
        require: true
    },
    review:{
        type: [{
            id: {
                type: String,
                require: true
            }
        }],
        require: false
    },
});

module.exports = model('Books', bookSchema)