import { Router }  from 'express'

import { studentController } from '../controllers'


var router = new Router()


router.post('/', (req,res) => {
  studentController.create(req,res)
})

router.get('/', (req,res) => {
  studentController.findList(req,res)
})

router.get('/:id', (req,res)=> {
  studentController.findOne(req,res)
})


module.exports = router