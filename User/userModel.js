const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    userName:String,
    firstName: String,
    lastName: String,
    sessionTimeOut: Number,
    createdDate:  Date,
    permissions:[String],
    passwordHash:String
})

module.exports = mongoose.model("users", userSchema)