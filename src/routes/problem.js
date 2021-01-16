var express = require('express');
import Authenticator from '../Authenticator'

const { authenticate } = Authenticator

import { problemController } from '../controllers'


var router = express.Router();

router.post('/', (req,res) => {
  problemController.create(req,res)
})

router.post ( '/find', authenticate,  (req,res) => {
  problemController.findList(req,res)
})

router.get('/replace', authenticate , (req,res) => {
  problemController.replace(req,res)
})


module.exports = router