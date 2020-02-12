const express = require('express')
const router = express()

const CONSTANTS = require('../constants')

const userController = require('../database/controllers/userController')

router.post('/register', (req, res) => {
    const { names, email, password } = req.body

    userController.findByEmail(email)
        .then(user => {
            if (user == null) {
                userController.insert({ names, email, password })
                    .then(result => {
                        res.json({ success: true, message: 'User successfully registered', userId: result._id })
                    })
                    .catch(err => {
                        console.error(err)
                        res.status(500).json({ success: false, message: CONSTANTS.SERVER_ERROR_MESSAGE })
                    })
            } else {
                res.json({ success: false, message: 'This email has already in use' })
            }
        })
        .catch(err => {
            console.error(err)
            res.status(500).json({ success: false, message: CONSTANTS.SERVER_ERROR_MESSAGE })
        })

})


router.put('/update', (req, res) => {
    const { userId, names, email, password } = req.body

    userController.update(userId, { names, email, password })
        .then(result => {
            res.json({ success: true, message: 'User successfully updated' })
        })
        .catch(err => {
            console.error(err)
            res.status(500).json({ success: false, message: CONSTANTS.SERVER_ERROR_MESSAGE })
        })
})

module.exports = router