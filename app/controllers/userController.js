const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

const User = require('../models/User')
const { validateRegisterInput } = require('../validation/register')
const { validateChangePassword } = require('../validation/changePassword')
const { validateLoginInput } = require('../validation/login')
const { hashpassword, genJwt } = require('../helpers/encrypting')
const { sendEmail } = require('../config/nodemailer.config')

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
        let confirmToken = await genJwt(req.body);
        // console.log(req.body)
        const newUser = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hashedpassword,
            birthday: req.body.birthday,
            confirmation_code: confirmToken
        })
        const user = await newUser.save()

        sendEmail(
            user.first_name,
            user.email,
            user.confirmation_code
        );

        res.status(201).json({
            success: true,
            message: `User registered succesfuly, email confirmation link has been sent to your email: ${user.email}!`,
            user
        });
        //send email with confirmation link
        //create a new route which will be called via confirmation link and change the active attribute to true

    } catch (error) {
        console.log(error)
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
    if (!user.active) {
        return res.status(401).send({
            message: "Pending Account. Please Verify Your Email!",
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

const changePassword = async function (req, res) {
    const { errors, isValid } = validateChangePassword(req.body);
    if (!isValid) {
        return res.status(422).json({
            success: false,
            message: errors
        })
    }

    const user = await User.findOne({ email: req.body.email })

    if (!await bcrypt.compare(req.body.old_password, user.password)) {
        return res.status(401).json({
            succes: false,
            message: 'Invalid credentials!'
        });
    }

    try {
        const newHashedPassword = await hashpassword(req.body.new_password)
        await User.findOneAndUpdate({ email: req.body.email }, { password: newHashedPassword })
        return res.json({
            succes: true,
            message: `Password changed succesfully!`,
        })
    } catch (error) {
        return res.status(500).json({
            succes: false,
            message: "Something went wrong!"
        })
    }
}

const confirmUser = async function (req, res) {
    try {
        const user = await User.findOneAndUpdate({ confirmation_code: req.params.confirmationCode }, { active: true })
        if (!user) {
            return res.status(404).json({
                succes: false,
                message: "User not found!"
            })
        }
        return res.json({
            succes: true,
            message: `Your account is now verified!`,
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
    me,
    changePassword,
    confirmUser
}