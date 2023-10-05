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
    totalAmount: {
        type: Number,
        required: true
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'OrderItems',
        required: true
    }],
    status: {
        type: String,
        enum: ['Preparing', 'Whent To Shipping', 'Delivered', "Done"],
        default: 'Preparing'
    },
    shippingAgency: {
        type: String,
        enum: ['Yalidin', 'Coyot'],
        required: true
    },
    shippingInfo: {
        type: Schema.Types.ObjectId,
        ref: 'ShippingInfo',
        required: true
    }
},
    {
        timestamps: true
    });

module.exports = model("Orders", orderSchema);