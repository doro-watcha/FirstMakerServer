var express = require('express');
import multer from 'multer'
import multerS3 from 'multer-s3'
import path from 'path'
import aws from 'aws-sdk'
import Authenticator from '../Authenticator'
import dotenv from 'dotenv'
dotenv.config()

const { authenticate } = Authenticator

import { problemController } from '../controllers'

const s3 = new aws.S3({
	accessKeyId: 'AKIAIX4FWDLCK3FVJGIA',
	secretAccessKey: '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'
})
const upload = multer({
	storage: multerS3({
		s3,
		bucket: 'mathproblem',
		acl: 'public-read',
		key: (req, file, cb) => {
			const extension = path.extname(file.originalname)
			const filename = `${Math.random()
				.toString(36)
				.substring(2, 15)}`
			const timestamp = Date.now()
			cb(null, `problem/${timestamp}_${extension}`)
		},
	}),
})


var router = express.Router();

router.post('/', upload.fields([{ name: 'problem', maxCount: 1 }, { name : 'solution', maxCount : 1}]), (req,res) => {
  console.log("why")
  problemController.create(req,res)
})

router.post ( '/find', authenticate,  (req,res) => {
  problemController.findList(req,res)
})

router.get('/replace', authenticate , (req,res) => {
  problemController.replace(req,res)
})


module.exports = router