const Validator = require('validator')
const Stringify = require('./stringify')

module.exports = validateLoginInput = (data) => {
    let errors = {}

    // Validate Email

    if (!Validator.isEmail(Stringify(data.email))) {
        errors.email = 'Email is invalid'
    }

    if (Validator.isEmpty(Stringify(data.email))) {
        errors.email = 'Email is required'
    }

    //Validate Passwords

    if (Validator.isEmpty(Stringify(data.password))) {
        errors.password = 'Password is required'
    }

    return {
        errors,
        isValid: !Object.keys(errors).length
    }
}