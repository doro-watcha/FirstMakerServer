var express = require('express');
var router = express.Router();

import authRouter from './auth'
import userRouter from './user'
import subjectRouter from './subject'
import bigChapterRouter from './bigChapter'
import middleChapterRouter from './middleChapter'
import smallChapterRouter from './smallChapter'
import problemRouter from './problem'
import noteRouter from './note'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/subject', subjectRouter)
router.use('/bigChapter', bigChapterRouter)
router.use('/middleChapter', middleChapterRouter)
router.use('/smallChapter', smallChapterRouter)
router.use('/problem', problemRouter)
router.use('/note', noteRouter)

module.exports = router