const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController')
const isAuth = require('../middlewares/auth')

router.get('/me', isAuth, userController.me)


module.exports = router
