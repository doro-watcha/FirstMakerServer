var express = require('express');

import { problemController } from '../controllers'


var router = express.Router();

router.post('/', (req,res) => {
  problemController.create(req,res)
})

router.get ( '/', (req,res) => {
  problemController.findList(req,res)
})


module.exports = router