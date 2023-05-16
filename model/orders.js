const {Schema, model} = require('mongoose');

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
    user_id: {
        type: String,
        require: true
    },
    total_amount: {
        type: String,
        require: true
    },
    items:{
        type: [string]
    },
    status: {
        type: Number,
        require: true
    },
    shipping_agency:{
        type: Number,
        require: true
    },
    shipping_info:{
        type:{
            address:{
                type:{
                    city:{
                        type: String,
                        require: true
                    },
                    wilaya:{
                        type: String,
                        require: true
                    },
                    town:{
                        type: String,
                        require: true
                    }
                },
                require: true
            },
            phone:{
                type: string,
                require: true
            }
        },
        required: true
    },
    created_at:{
        type: Date,
        require: true
    }
});

module.exports = model("orders", orderSchema);