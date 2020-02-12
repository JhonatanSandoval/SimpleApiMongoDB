const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    createdat: { type: Date, default: Date.now }
}, { collection: "posts" })

module.exports = mongoose.model("Posts", postSchema)
