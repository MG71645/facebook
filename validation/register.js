const Validator = require('validator')
const Stringify = require('./stringify')

module.exports = validateRegisterInput = (data) => {
    let errors = {}

    // Validate Name

    if (!Validator.isLength(Stringify(data.name), {min: 2, max: 30})) {
        errors.name = 'Name must be between 2 and 30 characters'
    }

    if (Validator.isEmpty(Stringify(data.name))) {
        errors.name = 'Name is required'
    }

    // Validate Email

    if (!Validator.isEmail(Stringify(data.email))) {
        errors.email = 'Email is invalid'
    }

    if (Validator.isEmpty(Stringify(data.email))) {
        errors.email = 'Email is required'
    }

    //Validate Passwords

    if (!Validator.isLength(Stringify(data.password), {min: 6, max: 30})) {
        errors.password = 'Password must be between 6 and 30 characters'
    }

    if (Validator.isEmpty(Stringify(data.password))) {
        errors.password = 'Password is required'
    }

    if (!Validator.equals(Stringify(data.password), Stringify(data.password2))) {
        errors.password2 = 'Passwords not match'
    }

    if (Validator.isEmpty(Stringify(data.password2))) {
        errors.password2 = 'Confirm password is required'
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}