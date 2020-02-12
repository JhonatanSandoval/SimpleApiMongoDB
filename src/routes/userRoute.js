const express = require('express')
const router = express()
const jwt = require('jsonwebtoken')

const CONSTANTS = require('../constants')

const userController = require('../database/controllers/userController')

router.post('/register', (req, res) => {
    const { names, email, password } = req.body

    userController.findByEmail(email)
        .then(user => {
            if (user == null) {
                userController.insert({ names, email, password })
                    .then(result => {
                        const token = generateToken({
                            _id: result._id,
                            names, email
                        })
                        res.json({ success: true, message: 'User successfully registered', token })
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

router.post('/login', (req, res) => {
    const { email, password } = req.body
    userController.findByEmail(email)
        .then(user => {
            if (user != null) {
                if (password === user.password) {
                    const token = generateToken(user)
                    res.json({ success: true, message: 'Welcome back', user, token })
                } else {
                    res.json({ success: false, message: 'Incorrect credentials' })
                }
            } else {
                res.json({ success: false, message: 'Unable to find user registered whith this email' })
            }
        })
        .catch(error =>
            res.status(500).json({ success: false, message: CONSTANTS.SERVER_ERROR_MESSAGE })
        )
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

let generateToken = (user) => {
    return jwt.sign({ user }, CONSTANTS.JWT.SEED, {
        expiresIn: CONSTANTS.JWT.EXPIRATION
    })
}

module.exports = router