const User = require('../models/user.model')
const bcrypt = require('bcrypt')

exports.createUser = (req, res) => {
    if(!req.body.email || !req.body.password || !req.body.firstName || !req.body.lastName) {
        return res.status(400).json({
            message: "Fill in the required fields"
        })
    }
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        currentRank: req.body.currentRank,
        role: req.body.role,
        adress: req.body.adress,
        profilePhoto: req.body.profilePhoto,
        age: req.body.details.age,
        pronoun: req.body.details.pronoun,
        nationality: req.body.details.nationality
    })


    user.save()
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message || "Couldn't save the User for some reason  ¯\_(ツ)_/¯"
            })
        })
}
//Read METHODS

//Finding an user with id
exports.findOneUser = (req, res) => {
    User.findById(req.params.userId)
        .then((user) => {
            if(!user) {
                return res.status(404).json({
                    message: "Couldn't find the user with id: " + req.params.userId,
                })
            }
            res.status(200).json(
                {
                    message: "Here is the user with id: " + req.params.userId
                },
                user
                )
            console.log(user)
        })
        .catch((err) => {
            return res.status(500).json({
                message: err + "\n| Found it but couldn't retrieve the user with id: " + req.params.userId + " |"
            })
        })
}

exports.findAllUsers = (req, res) => {
    User.find()
        .sort({ name: -1 })
        .then((users) => {
            res.status(200).json(
                {
                    message: "Here is all users"
                }, 
                users
                )
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message || "Couldn't get Users for some reason ¯\\_(ツ)_/¯"
            })
        })
}

//Delete METHODS

exports.deleteUser = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
        .then((user) => {
            if(!user) {
                return res.status(404).json({
                    message: "Couldn't find the user with id: " + req.params.userId
                })
            }
            res.status(200).json(
                {
                    message: 
                        "Deleted the user with id: " + req.params.userId
                }
            )
        })
        .catch((err) => {
            return res.status(500).json({
                message: "Couldn't delete user"
            })
        })
}

exports.updateUser = (req, res) => {
    if(!req.body.email || !req.body.password || !req.body.name) {
        return res.status(400).json({
            message: "Fill in the required fields"
        })
    }
    User.findByIdAndUpdate(req.params.userId, req.body, { new: true})
        .then((user) => {
            if(!user) {
                return res.status(404).json({
                    message: "Couldn't find the user with id: " + req.params.id,
                })
            }
            res.status(200).json(user)
        })
        .catch((err) => {
            return res.status(200).json(
                { message: err + "\n| Found it but couldn't retrieve the user with id: " + req.params.id + " |" }
            )
        })
}