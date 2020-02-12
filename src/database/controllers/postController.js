const postModel = require('../models/posts')

const _this = this

exports.getPosts = () => {
    return new Promise((resolve, reject) => {
        postModel
            .find()
            .populate('user', 'names email')
            .populate('comments.user', 'names email')
            .sort({ createdAt: 'desc' }).exec((err, posts) => {
                if (err) reject(err)
                resolve(posts)
            })
    })
}

exports.findById = (postId) => {
    return new Promise((resolve, reject) => {
        postModel.findOne({ _id: postId }).exec((err, posts) => {
            if (err) reject(err)
            resolve(posts)
        })
    })
}

exports.writePost = (userId, comment) => {
    return new Promise((resolve, reject) => {
        new postModel({
            comment, user: userId
        }).save((err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

exports.commentPost = async (userId, postId, comment) => {
    let post = await _this.findById(postId)
    if (post != null) {
        post.comments.push({
            user: userId,
            comment
        })
        post.save()
    }
}