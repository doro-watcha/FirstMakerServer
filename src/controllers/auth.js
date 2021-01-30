import jwt from 'jsonwebtoken'
import Joi from '@hapi/joi'
import axios from 'axios'
import aws from 'aws-sdk'
import dotenv from 'dotenv'
dotenv.config()

import { createErrorResponse} from '../utils/functions'
import { passwordRegex } from '../utils/variables'
import { userService, studentService, teacherService } from '../services'
import Teacher from '../models/Teacher'

// aws s3
const s3 = new aws.S3({
	accessKeyId: process.env.S3_ACCESS_KEY_ID,
	secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
	Bucket: process.env.S3_BUCKET_NAME,
})

export default class AuthController {


  static async token(req, res) {
		try {
			// user info from middlewawre: Authenticator.authenticate
      const { user } = req
    
			// get user info
			const foundUser = await userService.findOne({
				id: user.id,
			})

			// create response
			const response = {
				success: true,
				data: {
					user: foundUser,
				},
			}
			res.send(response)
		} catch (e) {
			res.send(createErrorResponse(e))
		}
  }

  static async signUp(req, res) {

		try {
			// validation
			const result = await Joi.validate(req.body, {
				email: Joi.string()
					.required(),
				password: Joi.string().min(8)
					.required(),
				name : Joi.string().required(),
				school : Joi.string().optional(),
				grade : Joi.string().optional(),
				mathGrade : Joi.number().optional(),
				type : Joi.string().optional(),
				teacherCode : Joi.string().optional()
			})


			const { email , password, school, grade, mathGrade, type , teacherCode, name} = result 
			if ( teacherCode !== undefined && type == "teacher" &&  teacherCode !== "34526555") throw Error('WRONG_TEACHER_CODE')
		

			console.log(type)
			// check if user already exists
			const alreadyUser = await userService.findOne({
				email
			})

			// [ERROR] USER_ALREADY_EXISTS
			if (alreadyUser) throw Error('USER_ALREADY_EXISTS')

			// create user
			const user = await userService.create({
				email,
				password,
				type,
				name
			})

			console.log(user.id)

			if ( type == "student") {

				const student = {
					school,
					grade,
					mathGrade,
					userId : user.id,
					name
				}

				await studentService.create(student)
			} else if( type == "teacher") {

				const teacher = {
					subject : "math",
					userId : user.id,
					name
				}
				await teacherService.create(teacher)
				
			}

			// create response
			const response = {
				success: true
			}

			res.send(response)
		} catch (e) {
			res.send(createErrorResponse(e))
		}
  }
  
  static async signIn(req, res) {


		try {

			const result = await Joi.validate(req.body, {
				email: Joi.string()
					.required(),
				password: Joi.string()
					.required()
			})

			const { email, password } = result 
			// get user info
			let user = await userService.findOne({
				email
			})

			// [ERROR] USER_NOT_FOUND
			if (!user) throw Error('USER_NOT_FOUND')

			// [ERROR] PASSWORD_MISMATCH
			if (!user.isValidPassword(password)) throw Error('PASSWORD_MISMATCH')

			// issue token
			const token = jwt.sign({ id: user.id, email: user.email }, 'token-secret-staging', {
				expiresIn: '60 days',
			})

			// create response
			const response = {
				success: true,
				data: {
					token,
					user
				},
			}
			res.send(response)
		} catch (e) {
			console.log(e)
			res.send(createErrorResponse(e))
		}
	}



}