const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    userName:String,
    firstName: String,
    lastName: String,
    sessionTimeOut: Number,
    createdDate:  Date,
    permissions:[String],
    passwordHash:String,
    isAdmin:Boolean
})

module.exports = mongoose.model("users", userSchema)