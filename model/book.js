const {Schema, model} = require('mongoose');

const bookSchema = new Schema({
    img:{
        type: String,
        required: true
    },
    thumb: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    language:{
        type: String,
        enum: ['Arabic', 'French', 'English'],
        required: true
    },
    genre:[{
        type: Schema.Types.ObjectId,
        ref: 'Genre',
        required: true
    }],
    review:[{
        type: Schema.Types.ObjectId,
        ref: 'bookReview'
    }],
    rating:{
        type: Number,
        default: 0,
        required: true
    }
},
{
    timestamps: true
});

module.exports = model('Book', bookSchema)