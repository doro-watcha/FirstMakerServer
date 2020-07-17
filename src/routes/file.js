import { Router } from 'express'
import { fileController } from '../controllers'
import Authenticator from '../Authenticator'
import multer from 'multer'
import path from 'path'

const { authenticate } = Authenticator

const router = new Router()

const upload_major = multer({
  storage: multer.diskStorage({
    // set a localstorage destination
    destination: (req, file, cb) => {
      cb(null, '../excelfile/');
    },
    // convert a file nameww
    filename: (req, file, cb) => {
      cb(null, "major" + path.extname(file.originalname))
    },
  }),
})

const upload_university = multer({
  storage : multer.diskStorage({
    destination : (req,file,cb) => {
    cb(null, '../excelfile/')
    },
    filename: (req,file,cb) => {
      cb(null, "university" + path.extname(file.originalname))
    },
  }),
})

router.post('/major' , upload_major.fields([{ name: 'excel', maxCount: 1 }]), (req,res) => {
  fileController.createMajorFile(req,res)
})


router.get('/major', (req,res) => {
  fileController.getMajorFile(req,res)
})

router.delete('/major', (req,res) => {
  fileController.deleteMajorFile(req,res)
})

router.get('/major/parse' , (req,res) => {
  fileController.parseMajor(req,res)
})


router.post('/university', upload_university.fields([{name:'excel', maxCount : 1}]), (req,res) => {
  fileController.createUnivFile(req,res)
})

router.get('/university', (req,res) => {
  fileController.getUnivFile(req,res)
})

router.delete('/university', (req,res) => {
  fileController.deleteUnivFile(req,res)
})

router.get('/university/parse' , ( req,res) => {
  fileController.parseUniv(req,res)
})
module.exports = router