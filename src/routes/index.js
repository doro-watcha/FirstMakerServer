var express = require('express');
var router = express.Router();

import universityRouter from './university'
import scoreRouter from './score'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/university', universityRouter)
router.use('/score', scoreRouter)

module.exports = router;
