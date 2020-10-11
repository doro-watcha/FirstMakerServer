var express = require('express');

import { bigChapterController } from '../controllers'


var router = express.Router();

router.post('/', (req,res) => {
  bigChapterController.create(req,res)
})

router.get ( '/', (req,res) => {
  bigChapterController.findList(req,res)
})


module.exports = router