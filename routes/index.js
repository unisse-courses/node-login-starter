const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('home', { pageTitle: 'Home', name: req.session.name } );
});

module.exports = router;
