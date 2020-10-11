var express = require('express');

import { homeworkController } from '../controllers'


const { authenticate } = Authenticator


var router = express.Router();


router.post('/', authenticate, (req,res) => {
  homeworkController.create(req,res)
})

router.get('/', (req,res) => {
  homeworkController.findList(req,res)
})