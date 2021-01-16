import { Router } from 'express'
import Authenticator from '../Authenticator'

const { authenticate } = Authenticator
import { homeworkController } from '../controllers'


var router = new Router()

router.post('/', authenticate, (req,res) => {
  homeworkController.create(req,res)
})

router.get ( '/', (req,res) => {
  homeworkController.findList(req,res)
})

router.get('/:id', (req,res) => {
  homeworkController.findOne(req,res)
})

router.delete('/:id', (req,res) =>{
  homeworkController.delete(req,res)
})


module.exports = router