
module.exports = {
    validateRegisterInput(data) {
        let errors = {}
        if (!data.email || data.email == "") {
            errors.email = "Email is required!"
        }
        if (!data.first_name || data.first_name == "") {
            errors.first_name = "First name is required!"
        }
        if (!data.last_name || data.last_name == "") {
            errors.last_name = "Last name is required!"
        }
        if (!data.password || data.password == "" || !data.password.match(/^[A-Za-z]\w{7,14}$/)) {
            errors.password = "Password should contain lower and upper case chars and min length 7!"
        }
        if (!data.passwordConfirmation || data.passwordConfirmation == "" || data.passwordConfirmation != data.password ) {
            errors.passwordConfirmation = "Password Confirmation not matching or empty!"
        }
        if (!data.birthday) {
            errors.birthday = "No date provided"
        }
        return {
            errors,
            isValid: Object.keys(errors).length === 0,
        };
    }
}