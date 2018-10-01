const Validator = require('validator')
const Stringify = require('./stringify')

module.exports = validatePostInput = (data) => {
    let errors = {}

    // Validate Text

    if (!Validator.isLength(Stringify(data.text), {min: 10, max: 300})) {
        errors.text = 'Post must be between 10 and 300 characters'
    }

    if (Validator.isEmpty(Stringify(data.text))) {
        errors.text = 'Text is required'
    }

    return {
        errors,
        isValid: !Object.keys(errors).length
    }
}
