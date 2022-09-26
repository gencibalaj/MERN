const validator = require('validator')

module.exports = {
    validateChangePassword(data){
        let errors = {}
        if (!data.email || data.email == "") {
            errors.emailEmpty = "Email is empty!"
        }
        if (!validator.isEmail(data.email)) {
            errors.emailFormat = "Email format is not valid!"
        }
        if (validator.isEmpty(data.old_password)) {
            errors.password = "Old password field is empty!"
        }
        if (!data.new_password.match(/^[A-Za-z]\w{7,14}$/)) {
            errors.passwordFormat = "Password should contain lower and upper case chars and min length 7!"
        }
        return {
            errors,
            isValid: Object.keys(errors).length === 0,
        };
    }
}