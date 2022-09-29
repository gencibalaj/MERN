const express = require('express')
const router = express.Router();
// const isAuth = require('../middlewares/auth')
const teamController = require('../controllers/teamController');
const auth = require('../middlewares/auth');

router.get('/', auth,teamController.get)
router.get('/:name/:leaderID',auth, teamController.addTeam)
router.delete('/:name',auth, teamController.deleteTeam)
router.post('/members/:name/:memberID',auth, teamController.addMembers)
router.delete('/members/:name/:memberId',auth, teamController.removeMember)
router.get('/:name/leader/:userId',auth,teamController.assignLeader)
// router.delete('/members/:teamName/:id', teamController.delete)
// router.get('/', teamController.confirmUser)
module.exports = router 



