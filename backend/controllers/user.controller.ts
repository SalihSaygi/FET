import {User} from '../models/user.model'
import {googlePassport} from '../config/passport-google'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { sessionizeUser } from '../helpers/middlewares.helpers'

export const createUser = (req, res) => {

    const saltHash = genPassword(req.body.password)
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    if(!req.body.email || !req.body.password || !req.body.firstName || !req.body.lastName) {
        return res.status(400).json({
            message: "Fill in the required fields"
        })
    }
    const user = new User({
        nickname: req.body.nickname,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
        hash: hash,
        salt: salt,
        googleId: googlePassport.googleId,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        currentRank: req.body.currentRank,
        role: req.body.role,
        address: req.body.adress,
        numberOfFindings: req.body.numberOfFindings,
        profilePhoto: req.body.profilePhoto,
        age: req.body.age,
        pronoun: req.body.pronoun,
        bio: req.body.bio,
    })

    const sessionUser = sessionizeUser(user)
    req.session.user = sessionUser
    res.send(sessionUser)

    user.save()
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.status(500).json({
                // eslint-disable-next-line no-useless-escape
                message: err.message || "Couldn't save the User for some reason  ¯\_(ツ)_/¯"
            })
        })
}
//Read METHODS

//Finding an user with id
export const findOneUser = (req, res) => {
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

export const findAllUsers = (req, res) => {
    User.find()
        .sort({ name: -1 })
        .then((users) => {
            res.status(200).json(
                {
                    message: "Here is all users"
                }, 
                users
                )
            console.log(users)
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message || "Couldn't get Users for some reason ¯\\_(ツ)_/¯"
            })
        })
        .limit(20)
}

//Delete METHODS

export const deleteUser = (req, res) => {
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

export const updateUser = (req, res) => {
    if(!req.body.email || !req.body.password || !req.body.name) {
        return res.status(400).json({
            message: "Fill in the required fields"
        })
    }
    User.findByIdAndUpdate(req.params.userId, req.body, { new: true})
        .then((user) => {
            if(!user) {
                return res.status(404).json({
                    message: "Couldn't find the user with id: " + req.params.userId,
                })
            }
            res.status(200).json(user)
        })
        .catch((err) => {
            return res.status(200).json(
                { message: err + "\n| Found it but couldn't retrieve the user with id: " + req.params.userId + " |" }
            );
        });
};

function genPassword(password) {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    
    return {
      salt: salt,
      hash: genHash
    };
}