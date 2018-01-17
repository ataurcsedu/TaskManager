const router = require('express').Router();
const userController = require('../controllers/userController');
var passport = require("passport");

/** *************** User CRUD routes, considering '/' as base, relative to '/users' ***************************/
router.route('/').get(userController.getAllUsers)
router.route('/user-name-id').get(userController.getAllUsersWithId)
router.route('/').post(userController.updateUser)
router.route('/:user_id').get(userController.getUserById)
router.route('/name/:user_name').get(userController.getUserByUserName)


module.exports = router