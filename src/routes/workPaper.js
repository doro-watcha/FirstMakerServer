import { Router }  from 'express'

import { workPaperController } from '../controllers'
import Authenticator from '../Authenticator'

const { authenticate } = Authenticator

var router = new Router()


router.post('/', authenticate, (req,res) =>{
  workPaperController.create(req,res)
})

router.get('/:id',(req,res) => {
  workPaperController.findOne(req,res)
})

router.get('/', authenticate, (req,res) => {
  workPaperController.findList(req,res)
})


router.patch('/:id', (req, res) => {
  workPaperController.update(req,res)
})

router.delete('/:id', authenticate, (req, res) => {
  workPaperController.delete(req,res)
})


module.exports = router