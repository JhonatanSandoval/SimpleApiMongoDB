const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" }, // who wrote the comment
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})

const postSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" }, // who create the post
    comments: [commentSchema],
    createdAt: { type: Date, default: Date.now }
}, { collection: "posts" })

module.exports = mongoose.model("Posts", postSchema)
