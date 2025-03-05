const express = require('express')
const router  = express.Router()

const UserController = require('../controllers/user')

router.route('/createNewUser').post(UserController.createNewUser)
router.route('/deleteUserById').delete(UserController.deleteUserById)
router.route('/getAllUsers').get(UserController.getAllUsers)
router.route('/getUserById').get(UserController.getUserById)
router.route('/updateUserById').put(UserController.updateUserById)

module.exports = router
