const { Schema, model } = require('mongoose');

const userModel = new Schema({
    name: {
        type: {
            fName: {
                type: String,
                required: true
            },
            lName: {
                type: String,
                required: true
            }
        },
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    profilePic: {
        type: String,
        required: false,
        // default: 
    },
    thumb: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    confirmedEmail: {
        type: Boolean,
        default: false
    },
    hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    shippingInfo: [{
        type: Schema.Types.ObjectId,
        ref: 'ShippingInfo'
    }],
    orderHistory: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Orders',
            required: true
        }],
        required: false
    },
    isAdmin: {
        type: Boolean,
        default: undefined
    }
},
    {
        timestamps: true
    })

module.exports = model("User", userModel);