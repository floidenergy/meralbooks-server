const {Schema, model} = require('mongoose');

const categoriesModel = new Schema({
    name: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: false
    }
},
{
    timestamps: true
});

module.exports = model("Category", categoriesModel);