const express = require('express')
const router = express.Router();
const todoController = require('../controllers/todoController')
const isAuth = require('../middlewares/auth')

router.get('/', isAuth, todoController.todos)
router.post('/add/:todo', isAuth, todoController.add)
router.delete('/remove/:todo', isAuth, todoController.remove)
// router.put('/mark/:todo', isAuth, todoController.mark)
router.patch('/update/:todo/:newTodo', isAuth, todoController.update )


module.exports = router
