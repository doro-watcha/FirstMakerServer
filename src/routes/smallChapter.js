var express = require('express');

import { smallChapterController } from '../controllers'


var router = express.Router();

router.post('/', (req,res) => {
  smallChapterController.create(req,res)
})

router.get ( '/', (req,res) => {
  smallChapterController.findList(req,res)
})

router.delete('/:id' , (req,res) => {
  smallChapterController.delete(req,res)
})


module.exports = router