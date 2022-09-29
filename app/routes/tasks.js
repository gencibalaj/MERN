const express = require('express')
const router = express.Router();
const taskController = require('../controllers/taskController')
const isAuth = require('../middlewares/auth')

router.get('/', isAuth, taskController.tasks)
router.post('/assign', isAuth, taskController.assignTasks)
router.delete('/delete/:taskName', isAuth, taskController.deleteTasks)



module.exports = router
