const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('home', { pageTitle: 'Home', name: ''} );
});

module.exports = router;
