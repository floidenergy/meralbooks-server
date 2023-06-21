const {Schema, model} = require('mongoose');

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
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    dob:{
        type: Date,
        required: true
    },
    profilePic:{
        type: String,
        required: false,
        // default: 
    },
    email:{
        type: String,
        required: true
    },
    confirmedEmail:{
        type: Boolean,
        default: false
    },
    hash:{
        type: String,
        required: true
    },
    salt:{
        type: String,
        required: true
    },
    shipping_info:[{
        type: Schema.Types.ObjectId,
        ref: 'Shipping_Info'
    }],
    order_history:[{
        type: Schema.Types.ObjectId,
        ref: 'Orders',
        required: true
    }],
    isAdmin:{
        type: Boolean,
        default: undefined
    },
    privacyToken:{
        type: [String],
        required: true
    }
},
{
    timestamps: true
})

module.exports = model("User", userModel);