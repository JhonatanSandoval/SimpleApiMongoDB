const userModel = require('../models/users')

exports.findById = (userId) => {
    return new Promise((resolve, reject) => {
        userModel.findById(userId)
            .exec((err, user) => {
                if (err) reject(err)
                resolve(user)
            })
    })
}

exports.findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({ email })
            .exec((err, user) => {
                if (err) reject(err)
                resolve(user)
            })
    })
}

exports.insert = (data) => {
    return new Promise((resolve, reject) => {
        new userModel({
            names: data.names,
            email: data.email,
            password: data.password
        }).save((err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

exports.update = (userId, data) => {
    return new Promise((resolve, reject) => {
        userModel.updateOne({ _id: userId }, {
            names: data.names,
            email: data.email,
            password: data.password
        }).exec((err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}