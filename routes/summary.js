const router = require('express').Router();
const summaryController = require('../controllers/summaryController');



router.route('/search').post(summaryController.getSummary);

module.exports = router