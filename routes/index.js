const router = require('express').Router();
const authRoutes = require('./auth');
const userRoutes = require('./user');
const taskRoutes = require('./task');
const macRoutes = require('./mac');


// Base Route for the Application (Can be deleted or comment out, if not needed)
router.route('/').get((req,res) => {
  res.send('hello world');
});


router.use('/auth', authRoutes)
router.use('/users', userRoutes);
router.use('/task', taskRoutes);
router.use('/mac', macRoutes);



module.exports = router;