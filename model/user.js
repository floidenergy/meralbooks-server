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
        type: [{
            token: {
                type: String,
                require: true
            },
            Type: {
                type: String,
                require: true
            },
            timeStamp: {
                type: Date,
                default: new Date()
            }
        }],
        require: false
    },
    created_at:{
        type: Date,
        default: new Date()
    }
})

module.exports = model("users", userModel);