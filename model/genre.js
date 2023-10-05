const {Schema, model} = require('mongoose');

const genreModel = new Schema({
    name: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: false
    },
    count: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
});

module.exports = model("Genre", genreModel);