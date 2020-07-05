import { reflectionRatioController } from '../controllers'
import { Router } from 'express'

import Authenticator from '../Authenticator'

const { authenticate, getUserInfo } = Authenticator

const router  = Router()

router.get('/', (req,res) => {
  reflectionRatioController.findByUnivId(req,res)
})

router.get('/:id' , (req,res) => {
  reflectionRatioController.findOne(req,res)
})

router.post('/', (req,res) => {
  reflectionRatioController.create(req,res)
})

router.patch('/:id' , (req,res) => {
  reflectionRatioController.update(req,res)
})

router.delete('/:id', (req,res) => {
  reflectionRatioController.delete(req,res)
})

module.exports = router