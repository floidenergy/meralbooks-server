const {Schema, model} = require('mongoose');

const userModel = new Schema({
    name: {
        type: {
            fName: {
                type: String,
                require: true
            },
            lName: {
                type: String,
                require: true
            }
        },
        require: true
    },
    username: {
        type: String,
        require: true
    },
    gender:{
        type: String,
        require: true
    },
    dob:{
        type: Date,
        require: false // TODO: make it true later on
    },
    profilePic:{
        type: String,
        required: false,
        // default: 
    },
    email:{
        type: String,
        require: true
    },
    confirmedEmail:{
        type: Boolean,
        default: false
    },
    hash:{
        type: String,
        require: true
    },
    salt:{
        type: String,
        require: true
    },
    info:{
        type:[{
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
                type: String,
                require: true
            }
        }],
        require: false
    },
    order_history:{
        type:[{
            order_id:{
                type: String,
                require: true
            }
        }],
        require: false
    },
    isAdmin:{
        type: Boolean,
        default: false,
        require: true
    },
    privacyToken:{
        type: [String],
        require: true
    },
    accountHistory: {
        type: [{
            date: Date,
            type: String
        }],
        require: false
    },
    created_at:{
        type: Date,
        default: new Date()
    }
})

module.exports = model("users", userModel);