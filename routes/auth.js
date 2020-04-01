const router = require('express').Router();
const userController = require('../controllers/userController');

// GET login to display login page
router.get('/login',(req, res) => {
  res.render('login', {
    pageTitle: 'Login',
  });
});

// GET register to display registration page
router.get('/register', (req, res) => {
  res.render('register', {
    pageTitle: 'Registration',
  });
});

// POST methods for form submissions
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// logout
router.get('/logout', userController.logoutUser);

module.exports = router;
