const express = require('express')
const router = express()

const CONSTANTS = require('../constants')

const userController = require('../database/controllers/userController')
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

router.post('/post', (req, res) => {
    const { userId, comment } = req.body

    postController.writePost(userId, comment)
        .then(result => {
            res.json({ success: true, message: 'Post saved', postId: result._id })
        })
        .catch(error =>
            res.status(500).json({ success: false, message: CONSTANTS.SERVER_ERROR_MESSAGE })
        )
})

router.post('/commentPost', (req, res) => {
    const { userId, postId, comment } = req.body
    postController.commentPost(userId, postId, comment)
        .then(result => {
            res.json({ success: true, message: `Post was commented by user: ${userId}` })
        })
        .catch(error =>
            res.status(500).json({ success: false, message: CONSTANTS.SERVER_ERROR_MESSAGE })
        )
})

module.exports = router