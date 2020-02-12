const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    names: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }, // could be hashed
    createdat: { type: Date, default: Date.now }
}, { collection: "users" })

module.exports = mongoose.model("Users", userSchema)
