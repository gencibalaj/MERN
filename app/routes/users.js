const express = require('express')
const router = express.Router();
// const isAuth = require('../middlewares/auth')
const userController = require('../controllers/userController')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/change_password', userController.changePassword)
router.get('/confirm/:confirmationCode', userController.confirmUser)
module.exports = router



