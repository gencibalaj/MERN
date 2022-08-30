
module.exports = {
    validateLoginInput(data) {
        let errors = {}
        if (!data.email || data.email == "") {
            errors.email = "Email is required!"
        }
        if (!data.password || data.password == "") {
            errors.password = "Password is required!"
        }
        return {
            errors,
            isValid: Object.keys(errors).length === 0,
        };
    }
}