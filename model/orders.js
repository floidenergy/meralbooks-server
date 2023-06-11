const { Schema, model } = require('mongoose');

/**
 * ------STATUS ENUM-------
 *  1 = preparing
 *  2 = whent to shipping
 *  3 = delivered
 */

/**
 *  --------SHIPPING AGENCY----------
 *  1 coyot
 *  2 yalidin
 */

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    total_amount: {
        type: Number,
        required: true
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Order_Items',
        required: true
    }],
    status: {
        type: String,
        enum: ['Preparing', 'Whent To Shipping', 'Delivered', "Done"],
        default: 'Preparing'
    },
    shipping_agency: {
        type: String,
        enum: ['Yalidin', 'Coyot'],
        required: true
    },
    shipping_info: {
        type: Schema.Types.ObjectId,
        ref: 'Shipping_Info',
        required: true
    }
},
    {
        timestamps: true
    });

module.exports = model("Orders", orderSchema);