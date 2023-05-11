const {Schema, model} = require('mongoose');

const reviewSchema = new Schema({
    user_id: {
        type: string
    }
})