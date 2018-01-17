const router = require('express').Router();
const taskController = require('../controllers/taskController');


/** *************** Task CRUD routes, considering '/' as base, relative to '/task' ***************************/
router.route('/search').post(taskController.getAllTasks)
router.route('/:task_id').get(taskController.getTaskById)
router.route('/').post(taskController.createTask)
router.route('/:task_id').put(taskController.updateTask)
router.route('/:task_id').delete(taskController.deleteTaskById)


module.exports = router