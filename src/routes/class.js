import { Router } from 'express'

import { classController } from '../controllers'


var router = new Router()

router.post('/', (req,res) => {
  classController.create(req,res)
})

router.get ( '/', (req,res) => {
  classController.findList(req,res)
})

router.get('/:id', (req,res) => {
  classController.findOne(req,res)
})

router.get('/:studentId/list', ( req,res) => {
  classController.findListByStudentId(req,res)
})
router.post('/addStudent', (req,res)=> {
  classController.addStudent(req,res)
})

router.post('/delete/student', (req,res)=> {
  classController.deleteStudent(req,res)
})


module.exports = router