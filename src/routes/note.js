var express = require('express');

import { noteController } from '../controllers'


var router = express.Router();

router.post('/', (req,res) => {
  noteController.create(req,res)
})

router.get ( '/', (req,res) => {
  noteController.findList(req,res)
})


module.exports = router