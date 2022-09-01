const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const hashpassword = async function (password) {
    password = password.toString()
    const hashedpassword = await bcrypt.hash(password, 10);
    return hashedpassword;
}


const genJwt = async function (user) {
    let jwtSecretKey = "JWT_SECRET_KEY";
    const payload = {
        email: user.email,
        time: Date()
    }
    const token = jwt.sign(payload, jwtSecretKey,
        {
            expiresIn: '1d'
        })
    return token
}


module.exports = {
    hashpassword,
    genJwt
}