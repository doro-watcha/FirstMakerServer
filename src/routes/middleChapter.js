var express = require('express');

import { middleChapterController } from '../controllers'


var router = express.Router();

router.post('/', (req,res) => {
  middleChapterController.create(req,res)
})

router.get ( '/', (req,res) => {
  middleChapterController.findList(req,res)
})


module.exports = router