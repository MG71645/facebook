const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Load Validation
const validateProfileInput = require('../../validation/profile')
const validateExperienceInput = require('../../validation/experience')

// Load Models
const Profile = require('../../models/Profile')
const User = require('../../models/User')

// @decs    Get current user profile
// @access  Private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = {}

    Profile.findOne({user: req.user.id})
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user'
                return res.status(404).json(errors)
            }

            res.json(profile)
        })
        .catch(error => res.status(404).json(error))
})

// @decs    Get profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
    const errors = {}

    Profile.findOne({handle: req.params.handle})
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user'
                res.status(404).json(errors)
            }

            res.json(profile)
        })
        .catch(err => res.status(404).json(err))
})

// @decs    Get profile by user ID
// @access  Public
router.get('/user/:userId', (req, res) => {
    const errors = {}

    Profile.findOne({user: req.params.userId})
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user'
                res.status(404).json(errors)
            }

            res.json(profile)
        })
        .catch(err => res.status(404).json({profile: 'There is no profile for this user'}))
})

// @decs    Create or edit user profile
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validateProfileInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }

    const profileFields = {
        user: req.user.id,
        handle: req.body.handle ? req.body.handle : '',
        status: req.body.status ? req.body.status : '',
        company: req.body.company ? req.body.company : '',
        website: req.body.website ? req.body.website : '',
        location: req.body.location ? req.body.location : '',
        skills: req.body.skills ? req.body.skills : [],
        bio: req.body.bio ? req.body.bio : '',
        social: {
            youtube: req.body.youtube ? req.body.youtube : '',
            facebook: req.body.facebook ? req.body.facebook : '',
            twitter: req.body.twitter ? req.body.twitter : '',
            linkedin: req.body.linkedin ? req.body.linkedin : '',
            instagram: req.body.instagram ? req.body.instagram : ''
        }
    }

    Profile.findOne({user: req.user.id})
        .then(profile => {
            if (profile) {
                // Update profile
                Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true})
                    .then(profile => res.json(profile))
            } else {
                // Create profile
                Profile.findOne({handle: profileFields.handle})
                    .then(profile => {
                        if (profile) {
                            errors.handle = 'That handle already exists'
                            res.status(400).json(errors)
                        }

                        new Profile(profileFields).save()
                            .then(profile => res.json(profile))
                    })
            }
        })
})

// @decs    Add experience to profile
// @access  Private
router.post('/experience', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validateExperienceInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }

    Profile.findOne({user: req.user.id})
        .then(profile => {
            delete profile.__v
            const newExperience = {}
            if (req.body.title) newExperience.title = req.body.title
            if (req.body.company) newExperience.company = req.body.company
            if (req.body.location) newExperience.location = req.body.location
            if (req.body.from) newExperience.from = req.body.from
            if (req.body.to) newExperience.to = req.body.to
            if (req.body.current) newExperience.current = req.body.current
            if (req.body.description) newExperience.description = req.body.description
            console.log(newExperience)
            profile.experience.push(newExperience)
            profile.save()
                .then(profile => res.json(profile))
                .catch(err => res.status(400).json(err))
        })
})

// @decs    Delete experience from profile
// @access  Private
router.delete('/experience/:experienceId', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id})
        .then(profile => {
            const index = profile.experience.map(item => item.id).indexOf(req.params.experienceId)
            profile.experience.splice(index, 1)
            profile.save()
                .then(profile => res.json(profile))
                .catch(err => res.status(400).json(err))
        })
        .catch(err => res.status(404).json(err))
})

// @decs    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
    const errors = {}

    Profile.find()
        .then(profiles => {
            if (!profiles) {
                errors.noprofile = 'There are no profiles'
                return res.status(404).json(errors)
            }

            res.json(profiles)
        })
        .catch(err => res.status(404).json({profile: 'There are no profiles'}))
})

// @decs    Delete profile
// @access  Private
router.delete('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOneAndRemove({user: req.user.id})
        .then(() => {
            console.log('Profile Deleted')
            res.status(200)
        })
        .catch(err => res.status(404).json(err))
})

module.exports = router
