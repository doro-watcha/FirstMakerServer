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

	

			console.log(file.originalname)

			const fileName = escape(file.originalname)

			console.log(file.filename)
	
			console.log(fileName)
			const timestamp = getToday()
			cb(null, `${file.fieldname}/${timestamp}_${fileName}`)
		},
	}),
})


var router = express.Router();

router.post('/', upload.fields([{ name: 'problem', maxCount: 1 }, { name : 'solution', maxCount : 1}]), (req,res) => {
  problemController.create(req,res)
})

router.post ( '/find', authenticate,  (req,res) => {
  problemController.findList(req,res)
})

router.get('/replace', authenticate , (req,res) => {
  problemController.replace(req,res)
})

router.get('/search' , (req,res) => {
	problemController.search(req,res)
})

router.patch('/:id', (req,res) => {
	problemController.update(req,res)
})


function getToday(){
	var date = new Date();
	var year = date.getFullYear();
	var month = ("0" + (1 + date.getMonth())).slice(-2);
	var day = ("0" + date.getDate()).slice(-2);
	var hour = date.getHours()
	if ( hour < 10 ) hour = "0" + hour 
	var minute = date.getMinutes()
	if ( minute < 10 ) minute = "0" + minute
	var second = date.getSeconds()
	if ( second < 10 ) second = "0" + second 
	return year + "-" + month + "-" + day + "_" + hour + ":" + minute + ":" + second
}

module.exports = router