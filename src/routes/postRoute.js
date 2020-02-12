const express = require('express')
const router = express()

const CONSTANTS = require('../constants')

const authMiddleware = require('../middlewares/auth')
const postController = require('../database/controllers/postController')

router.get('/', (req, res) => {
    postController.getPosts()
        .then(posts => {
            res.json(posts)
        })
        .catch(error =>
            res.status(500).json({ success: false, message: CONSTANTS.SERVER_ERROR_MESSAGE })
        )
})

router.post('/post', authMiddleware.verifyToken, (req, res) => { // protected by middleware
    const { comment } = req.body

    postController.writePost(req.userFromToken._id, comment)
        .then(result => {
            res.json({ success: true, message: 'Post saved', postId: result._id })
        })
        .catch(error =>
            res.status(500).json({ success: false, message: CONSTANTS.SERVER_ERROR_MESSAGE })
        )
})

router.post('/commentPost', authMiddleware.verifyToken, (req, res) => {  // protected by middleware
    const { postId, comment } = req.body
    const userId = req.userFromToken._id
    postController.findById(postId)
        .then(post => {
            postController.commentPost(post, { user: userId, comment })
                .then(result => {
                    res.json({ success: true, message: `Post was commented by user: ${userId}`, commentId: result._id })
                })
                .catch(error => {
                    console.error(error)
                    res.status(500).json({ success: false, message: CONSTANTS.SERVER_ERROR_MESSAGE })
                })
        })
        .catch(error => {
            console.error(error)
            res.status(500).json({ success: false, message: CONSTANTS.SERVER_ERROR_MESSAGE })
        })
})

module.exports = router