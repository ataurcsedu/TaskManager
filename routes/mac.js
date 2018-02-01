const router = require('express').Router();
const macController = require('../controllers/macController');


/** *************** Task CRUD routes, considering '/' as base, relative to '/task' ***************************/
router.route('/:mac').get(macController.getMac)
router.route('/checkout/:mac').get(macController.checkOut)


module.exports = router