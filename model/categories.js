const {Schema, model} = require('mongoose');

const categoriesModel = new Schema({
    name: {
        type: String,
        require: true,
    },
    description:{
        type: String,
        require: false
    },
    created_at:{
        type: Date,
        require: true
    }
});

module.exports = model("categories", categoriesModel);