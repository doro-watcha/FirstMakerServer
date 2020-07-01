var express = require('express');
var router = express.Router();

import universityRouter from './university'
import scoreRouter from './score'
import authRouter from './auth'
import userRouter from './user'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/university', universityRouter)
router.use('/score', scoreRouter)
router.use('/auth', authRouter)
router.use('/user', userRouter)


module.exports = router