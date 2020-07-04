import { paymentRecordController } from '../controllers'
import { Router } from 'express'

import Authenticator from '../Authenticator'

const { authenticate, getUserInfo } = Authenticator

const router  = Router()


router.get('/', authenticate, (req,res) => {
  paymentRecordController.findList(req,res)
})

router.get('/:id' , authenticate , (req,res) => {
  paymentRecordController.findOne(req,res)
})

router.post('/', authenticate, ( req, res) => {
  paymentRecordController.create(req,res)
})

router.patch('/:id', authenticate , (req,res) => {
  paymentRecordController.update(req,res)
})

router.delete('/:id', authenticate, (req,res) => {
  paymentRecordController.delete(req,res)
})

module.exports = router
