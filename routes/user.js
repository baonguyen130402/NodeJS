const express = require('express')
const router  = express.Router()

const UserController = require('../controllers/user')

router.route('/getAllUsers').get(UserController.getAllUsers)
router.route('/createNewUser').post(UserController.createNewUser)

module.exports = router
