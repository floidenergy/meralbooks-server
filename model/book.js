const {Schema, model} = require('mongoose');

const bookSchema = new Schema({
    img:{
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
    category:[{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }],
    review:[{
        type: Schema.Types.ObjectId,
        ref: 'bookReview'
    }],
},
{
    timestamps: true
});

module.exports = model('Book', bookSchema)