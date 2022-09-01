const validator = require('validator')

module.exports = {
    validateRegisterInput(data) {
        let errors = {}
        if (!data.email || data.email == "") {
            errors.email = "Email can not be blank!"
        }
        if (!validator.isEmail(data.email)) {
            errors.emailFormat = "Email format is not valid!"
        }
        if (validator.isEmpty(data.first_name)) {
            errors.first_name = "First name is required!"
        }
        if (validator.isEmpty(data.last_name)) {
            errors.last_name = "Last name is required!"
        }
        if (validator.isEmpty(data.password)) {
            errors.password = "Password can not be blank!"
        }
        if (!data.password.match(/^[A-Za-z]\w{7,14}$/)) {
            errors.passwordFormat = "Password should contain lower and upper case chars and min length 7!"
        }
        if (data.passwordConfirmation != data.password ) {
            errors.passwordConfirmation = "Password Confirmation not matching or empty!"
        }
        if (validator.isEmpty(data.birthday)) {
            errors.birthday = "No date provided"
        }
        return {
            errors,
            isValid: Object.keys(errors).length === 0,
        };
    }
}