const nodemailer = require("nodemailer");

const user = "gencibalaj@gmail.com"
const pass = "opbszbdvwdoyfekp"

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: user,
        pass: pass,
    },
});

const sendEmail = function (name, email, confirmationCode) {
    try {
        transport.sendMail({
            from: user,
            to: email,
            subject: "Please confirm your account",
            html:
                `<div>
                <h1>Email Confirmation</h1>
            <h2>Hello ${name}</h2>
            <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
            <a href=http://localhost:${process.env.PORT}/api/users/confirm/${confirmationCode}> Click here</a>
            </div>`,
        })

    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    sendEmail
}