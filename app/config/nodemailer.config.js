const nodemailer = require("nodemailer");

const user = process.env.user
const pass = process.env.pass

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
            subject: "Please confirm your FSCH account",
            html:
                `<div>
                <h1>Email Confirmation</h1>
            <h2>Hello ${name}</h2>
            <p>Thank you for registering to our test app!</p>
            <p>Please confirm your email by clicking on the following link</p>
            <a href=http://localhost:${process.env.PORT}/api/users/confirm/${confirmationCode}> Click here to confirm </a>
            </div>`,
        })

    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    sendEmail
}