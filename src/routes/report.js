import { reportController } from '../controllers'
import { Router } from 'express'

import Authenticator from '../Authenticator'

const { authenticate, getUserInfo } = Authenticator

const router  = Router()


router.get('/', (req,res) => {
  reportController.findList(req,res)
})

router.get('/:id' , (req,res) => {
  reportController.findReport(req,res)
})

router.post('/', (req,res) => {
  reportController.createReport(req,res)
})

router.patch('/:id', (req, res) => {
  reportController.updateReport(req.res)
})

router.delete('/:id', (req,res) => {
  reportController.deleteReport(req,res)
})


module.exports = router
