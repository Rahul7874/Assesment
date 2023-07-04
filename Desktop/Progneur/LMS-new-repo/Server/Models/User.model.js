const mongoose = require("mongoose")

const userSchema = mongoose.Schema({

    fname: { type: String, required: true },
    lname: { type: String, required: true },
    mobno: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin:{type:Boolean,default:false},
    isSuperAdmin:{type:Boolean,default:false},

})

const UserModel = mongoose.model("user", userSchema)

module.exports={
    UserModel
}