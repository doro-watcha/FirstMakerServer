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
	
			const today = new Date()
			today.setHours(	today.getHours+9)
			const timestamp = date_to_str(today)
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


function date_to_str(format)

{

    var year = format.getFullYear();

    var month = format.getMonth() + 1;

    if(month<10) month = '0' + month;

    var date = format.getDate();

    if(date<10) date = '0' + date;

    var hour = format.getHours();

    if(hour<10) hour = '0' + hour;

    var min = format.getMinutes();

    if(min<10) min = '0' + min;

    var sec = format.getSeconds();

    if(sec < 10) sec = '0' + sec;

    

    return year + "-" + month + "-" + date + "_" + hour + ":" + min + ":" + sec;

}

module.exports = router