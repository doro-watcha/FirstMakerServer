import express from 'express'

import { subjectController } from '../controllers'


var router = express.Router();


router.post('/', (req,res) => {
  subjectController.create(req,res)
})

router.get('/', (req,res) => {
  subjectController.findList(req,res)
})


module.exports = router