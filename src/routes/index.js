var express = require('express');
var router = express.Router();

import authRouter from './auth'
import userRouter from './user'
import studentRouter from './student'
import subjectRouter from './subject'
import bigChapterRouter from './bigChapter'
import middleChapterRouter from './middleChapter'
import smallChapterRouter from './smallChapter'
import problemRouter from './problem'
import noteRouter from './note'
import collectionRouter from './collection'
import examRouter from './exam'
import homeworkRouter from './homework'
import workBookRouter from './workBook'
import workPaperRouter from './workPaper'
import classRouter from './class'
import blackListRouter from './blackList'

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
router.use('/collection', collectionRouter)
router.use('/exam', examRouter)
router.use('/homework', homeworkRouter)
router.use('/workBook', workBookRouter)
router.use('/workPaper', workPaperRouter)
router.use('/student', studentRouter)
router.use('/class', classRouter)
router.use('/blackList' , blackListRouter)
module.exports = router