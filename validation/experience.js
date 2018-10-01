const Validator = require('validator')
const Stringify = require('./stringify')

module.exports = validateExperienceInput = (data) => {
    let errors = {}

    // Validate Title

    if (Validator.isEmpty(Stringify(data.title))) {
        errors.title = 'Title is required'
    }

    // Validate Company

    if (Validator.isEmpty(Stringify(data.company))) {
        errors.company = 'Company is required'
    }

    // Validate From

    if (Validator.isEmpty(Stringify(data.from))) {
        errors.from = 'This field is required'
    }

    return {
        errors,
        isValid: !Object.keys(errors).length
    }
}