const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

const User = require('../models/User')
const { validateRegisterInput } = require('../validation/register')
const { validateLoginInput } = require('../validation/login')
const { hashpassword, genJwt } = require('../helpers/encrypting')
dotenv.config();

const me = async function (req, res) {
    const user = req.user
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "You are not logged in!"
        })
    }
    return res.json({
        success: true,
        profile: req.user,
    })
}

const register = async function (req, res) {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(422).json({
            success: false,
            message: errors,
        });
    }
    const hashedpassword = await hashpassword(req.body.password);
    const user = await User.findOne({ email: req.body.email })
    if (user) {
        // console.log(user)
        return res.status(400).json({
            success: false,
            errors: 'Email already registered!'
        })
    }
    try {
        // console.log(req.body)
        const newUser = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hashedpassword,
            birthday: req.body.birthday,
        })
        const user = await newUser.save()
        res.status(201).json({
            success: true,
            message: 'User registered sucesfully!',
            user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}

const login = async function (req, res) {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(422).json({
            success: false,
            message: errors
        })
    }
    const user = await User.findOne({ email: req.body.email })

    if (!user || !await bcrypt.compare(req.body.password, user.password)) {
        return res.status(401).json({
            succes: false,
            message: 'Invalid credentials!'
        });
    }
    try {
        let token = await genJwt(req.body);
        return res.json({
            succes: true,
            message: `Hi ${user.first_name}, You are logged in!`,
            token: token
        })
    } catch (error) {
        return res.status(500).json({
            succes: false,
            message: "Something went wrong!"
        })
    }

}

module.exports = {
    register,
    login,
    me
}