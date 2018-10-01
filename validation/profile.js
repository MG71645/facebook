const Validator = require('validator')
const Stringify = require('./stringify')

module.exports = validateProfileInput = (data) => {
    let errors = {}

    // Validate Handle

    if (!Validator.isLength(Stringify(data.handle), {min: 2, max: 40})) {
        errors.handle = 'Handle needs to be between 2 and 40 characters'
    }

    if (Validator.isEmpty(Stringify(data.handle))) {
        errors.handle = 'Handle is required'
    }

    // Validate Status

    if (Validator.isEmpty(Stringify(data.status))) {
        errors.status = 'Status is required'
    }

    // Validate Skills

    console.log(Stringify(data.skills))
    if (Validator.isEmpty(Stringify(data.skills))) {
        errors.skills = 'Skills is required'
    }

    // Validate Website

    if (data.website) {
        if (!Validator.isURL(Stringify(data.website))) {
            errors.website = 'Not a valid URL'
        }
    }

    // Validate Social

    if (data.youtube) {
        if (!Validator.isURL(Stringify(data.youtube))) {
            errors.youtube = 'Not a valid URL'
        }
    }

    if (data.facebook) {
        if (!Validator.isURL(Stringify(data.facebook))) {
            errors.facebook = 'Not a valid URL'
        }
    }

    if (data.twitter) {
        if (!Validator.isURL(Stringify(data.twitter))) {
            errors.twitter = 'Not a valid URL'
        }
    }

    if (data.linkedin) {
        if (!Validator.isURL(Stringify(data.linkedin))) {
            errors.linkedin = 'Not a valid URL'
        }
    }

    if (data.instagram) {
        if (!Validator.isURL(Stringify(data.instagram))) {
            errors.instagram = 'Not a valid URL'
        }
    }

    return {
        errors,
        isValid: !Object.keys(errors).length
    }
}