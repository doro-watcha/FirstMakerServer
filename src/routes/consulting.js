import { Router } from 'express'
import { consultingController } from '../controllers'
import Authenticator from '../Authenticator'

const { authenticate } = Authenticator

const router = new Router()


router.get('/', authenticate , (req, res) =>{
  consultingController.findList(req,res)
})

router.get('/:id' , (req,res) => {
  consultingController.findOne(req,res)
})

router.post('/', (req,res) => {
  consultingController.createConsulting(req,res)
})

router.patch('/:id' , (req,res) => {
  consultingController.updateConsulting(req,res)
})

router.delete('/:id', (req,res) => {
  consultingController.deleteConsulting(req,res)
})



module.exports = router