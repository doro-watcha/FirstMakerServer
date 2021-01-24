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
	
			console.log(Date().toLocaleLowerCase())
			const timestamp = getToday(Date().toLocaleLowerCase())

			console.log(timestamp)
			cb(null, `problem/${timestamp}_${file.originalname}`)
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


function getToday(){
	var date = new Date();
	var year = date.getFullYear();
	var month = ("0" + (1 + date.getMonth())).slice(-2);
	var day = ("0" + date.getDate()).slice(-2);

	return year + "-" + month + "-" + day;
}

module.exports = router