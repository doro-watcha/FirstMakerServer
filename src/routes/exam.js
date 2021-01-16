import { Router } from 'express'
import Authenticator from '../Authenticator'

const { authenticate } = Authenticator

import { examController } from '../controllers'


var router = new Router()

router.post('/', authenticate, (req,res) => {
  examController.create(req,res)
})

router.get ( '/', (req,res) => {
  examController.findList(req,res)
})

router.get('/:id', (req,res) => {
  examController.findOne(req,res)
})

router.delete('/:id', (req,res) =>{
  examController.delete(req,res)
})


module.exports = router