const {Schema, model} = require('mongoose');

const reviewSchema = new Schema({
    user_id: {
        type: String,
        require: true
    },
    review: {
        type: String,
        require: true
    },
    rate: {
        type: Number,
        require: true
    },
    book_id: {
        type: String,
        require: true
    }
})