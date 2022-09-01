const validator = require('validator')

module.exports = {
    validateLoginInput(data) {
        let errors = {}
        if (!data.email || data.email == "") {
            errors.emailEmpty = "Email is empty!"
        }
        if (!validator.isEmail(data.email)) {
            errors.emailFormat = "Email format is not valid!"
        }
        if (validator.isEmpty(data.password)) {
            errors.password = "Password is empty!"
        }
        return {
            errors,
            isValid: Object.keys(errors).length === 0,
        };
    }
}