const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')

// Load Input Validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

// Load user model
const User = require('../../models/User')
const Profile = require('../../models/Profile')

// @decs    Register user
// @access  Public
router.post('/register', (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body)

    if (!isValid) {
        console.log('123')
        return res.status(400).json(errors)
    }

    User.findOne({email: req.body.email})
        .then(user => {
            if (user) {
                errors.email = 'Email is already taken'
                return res.status(400).json(errors)
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })

                bcrypt.genSalt(10, (error, salt) => {
                    bcrypt.hash(newUser.password, salt, (error, hash) => {
                        if (error) throw error
                        newUser.password = hash
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(error => console.log(error))
                    })
                })
            }
        })
})

// @decs    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
    const {errors, isValid} = validateLoginInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }

    const email = req.body.email
    const password = req.body.password

    // Find user by email
    User.findOne({email})
        .then(user => {
            if (!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors)
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            avatar: user.avatar
                        }
                        jwt.sign(payload, keys.secret, {expiresIn: 3600}, (error, token) => {
                            res.json({success: true, token: 'Bearer ' + token})
                        })
                    } else {
                        errors.password = 'Password incorrect'
                        res.status(400).json(errors)
                    }
                })
        })
})

// @decs    Update user
// @access  Private
router.post('/update/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = {}

    User.findByIdAndUpdate(req.params.id, {$set: {avatar: req.body.avatar}}, {new: true})
        .then(user => {
            if (!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors)
            }

            res.json({
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar
            })
        })
})

// @decs    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        avatar: user.avatar
    })
})

// @decs    Delete user and profile
// @access  Private
router.delete('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    User.findOneAndRemove({user: req.user.id})
        .then(() => {
            Profile.findOneAndRemove({user: req.user.id})
                .catch(err => res.status(404).json(err))
        })
        .catch(err => res.status(404).json(err))
})

// @decs    Get user
// @access  Public
router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(404).json(err))
})

module.exports = router
