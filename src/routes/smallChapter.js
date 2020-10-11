var express = require('express');

import { smallChapterController } from '../controllers'


var router = express.Router();

router.post('/', (req,res) => {
  smallChapterController.create(req,res)
})

router.get ( '/', (req,res) => {
  smallChapterController.findList(req,res)
})


module.exports = router