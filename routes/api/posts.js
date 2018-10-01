const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Import models
const Post = require('../../models/Post')
const Profile = require('../../models/Profile')

// Validation
const validatePostInput = require('../../validation/post')

// @decs    Get posts
// @access  Public
router.get('/', (req, res) => {
    const headers = req.headers.user ? {user: req.headers.user} : null
    Post.find(headers).sort({date: -1}).populate('user comments.user', 'name avatar')
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({nopostsfound: 'No posts found'}))
})

// @decs    Get post by ID
// @access  Public
router.get('/:post', (req, res) => {
    Post.findById(req.params.post)
        .then(post => res.json(post))
        .catch(err => res.status(404).json({nopostfound: 'No post found with that ID'}))
})

// @decs    Create post
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validatePostInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }

    const newPost = new Post({
        user: req.user.id,
        content: {
            text: req.body.text,
            image: req.body.image
        }
    })

    newPost.save()
        .then(post => Post.findById(post._id).populate('user', 'name avatar')
            .then(post => res.json(post)))
})

// @decs    Delete post
// @access  Private
router.delete('/:post', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id})
        .then(profile => {
            Post.findById(req.params.post)
                .then(post => {
                    if (post.user.toString() !== req.user.id) {
                        return res.status(401).json({notauthorized: 'User not authorized'})
                    }

                    post.remove()
                        .then(() => res.json({success: true}))
                        .catch(err => res.status(404).json({postnotfound: 'No post found'}))
                })
        })
})

// @decs    Like post
// @access  Private
router.post('/like/:post', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id})
        .then(profile => {
            Post.findById(req.params.post)
                .then(post => {
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                        return res.status(400).json({alreadyliked: 'User already liked this post'})
                    }

                    post.likes.push({user: req.user.id})

                    post.save()
                        .then(post => Post.findById(post._id).populate('user comments.user', 'name avatar')
                            .then(post => res.json(post)))
                })
                .catch(err => res.status(400).json({postnotfound: 'No post found'}))
        })
})

// @decs    Unlike post
// @access  Private
router.post('/unlike/:post', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id})
        .then(profile => {
            Post.findById(req.params.post)
                .then(post => {
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                        return res.status(400).json({notliked: 'You have not yet liked this post'})
                    }

                    post.likes.splice(post.likes.map(item => item.user.toString()).indexOf(req.user.id), 1)

                    post.save()
                        .then(post => Post.findById(post._id).populate('user comments.user', 'name avatar')
                            .then(post => res.json(post)))
                })
                .catch(err => res.status(400).json({postnotfound: 'No post found'}))
        })
})

// @decs    Add comment to post
// @access  Private
router.post('/comment/:post', passport.authenticate('jwt', {session: false}), (req, res) => {
    Post.findById(req.params.post)
        .then(post => {
            const newComment = {
                user: req.user.id,
                text: req.body.text
            }

            post.comments.push(newComment)

            post.save()
                .then(post => Post.findById(post._id).populate('user comments.user', 'name avatar')
                    .then(post => res.json(post)))
        })
        .catch(err => res.status(404).json({postnotfound: 'No post found'}))
})

// @decs    Delete comment
// @access  Private
router.delete('/comment/:post/:comment', passport.authenticate('jwt', {session: false}), (req, res) => {
    Post.findById(req.params.post)
        .then(post => {
            if (post.comments.filter(comment => comment._id.toString() === req.params.comment).length === 0) {
                return res.status(404).json({commentnotexists: 'Comment does not exist'})
            }

            post.comments.splice(post.comments.map(comment => comment._id.toString()).indexOf(req.params.comment), 1)

            post.save()
                .then(post => Post.findById(post._id).populate('user comments.user', 'name avatar')
                    .then(post => res.json(post)))
        })
        .catch(err => res.status(404).json({postnotfound: 'No post found'}))
})

module.exports = router
