const {Schema, model} = require('mongoose');

const orderItemsSchema = new Schema({
    oerder_id:{
        type: String,
        require: true
    },
    book_id: {
        type: String,
        require: true
    },
    quantity:{
        type: Number,
        require: true,
    },
    price: {
        type: Number,
        require: true
    }
});

module.exports = model('order_items', orderItemsSchema);