import { Router } from 'express'
import { fileController } from '../controllers'
import Authenticator from '../Authenticator'
import multer from 'multer'
import path from 'path'

const { authenticate } = Authenticator

const router = new Router()

const upload = multer({
  storage: multer.diskStorage({
    // set a localstorage destination
    destination: (req, file, cb) => {
      cb(null, '../file/');
    },
    // convert a file name
    filename: (req, file, cb) => {
      cb(null, "major" + path.extname(file.originalname))
    },
  }),
})


router.post('/major' , authenticate, upload.fields([{ name: 'excel', maxCount: 1 }]), (req,res) => {
  console.log("wow")
  fileController.createMajorFile(req,res)
})


router.get('/major', (req,res) => {
  console.log("tlqkf")
  fileController.getMajorFile(req,res)
})

router.delete('/major', (req,res) => {
  fileController.deleteMajorFile(req,res)
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