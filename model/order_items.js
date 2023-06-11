const {Schema, model} = require('mongoose');

const orderItemsSchema = new Schema({
    order:{
        type: Schema.Types.ObjectId,
        ref: 'Orders',
        required: true
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    quantity:{
        type: Number,
        required: true,
    }
},
{
    timestamps: true
});

module.exports = model('Order_Items', orderItemsSchema);