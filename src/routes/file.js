import { Router } from 'express'
import { fileController } from '../controllers'
import Authenticator from '../Authenticator'

const { authenticate } = Authenticator

const router = new Router()

router.post('/major', (req, res) => {
  fileController.createMajor(req,res)
})

router.get('/major', (req,res) => {
  console.log("tlqkf")
  fileController.getMajor(req,res)
})

router.delete('/major', (req,res) => {
  fileController.deleteMajor(req,res)
})


router.post('/university', (req,res) => {
  fileController.createUniversity(req,res)
})

router.get('/university', (req,res) => {
  fileController.getUniversity(req,res)
})

router.delete('/university', (req,res) => {
  fileController.deleteUniversity(req,res)
})

module.exports = router