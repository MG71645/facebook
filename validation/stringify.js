const Stringify = value => {
    if (
        value === undefined ||
        value === null ||
        value.length === 0 ||
        (typeof value === 'object' && Object.keys(value).length === 0)
    ) {
        return ''
    } else if (Array.isArray(value)) {
        return value.join(',')
    }

    return value
}

module.exports = Stringify