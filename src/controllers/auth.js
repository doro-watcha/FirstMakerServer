import jwt from 'jsonwebtoken'
import Joi from '@hapi/joi'
import axios from 'axios'
import aws from 'aws-sdk'
import dotenv from 'dotenv'
dotenv.config()

import { createErrorResponse} from '../utils/functions'
import { passwordRegex } from '../utils/variables'
import { userService } from '../services'

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
				password: Joi.string()
					.regex(passwordRegex)
					.required(),
				name : Joi.string(),
				highSchool : Joi.string(),
				line : Joi.string(),
				graduateYear : Joi.number(),
				telephone : Joi.string(),
				gender : Joi.string()

			})
		
			const { email , password , name , highSchool , line, graduateYear , telephone, gender } = result 
			// check if user already exists
			const user = await userService.findOne({
				email
			})

			// [ERROR] USER_ALREADY_EXISTS
			if (user) throw Error('USER_ALREADY_EXISTS')

			// create user
			const newUser = await userService.create({
				name: name,
				email,
				password,
				highSchool,
				line,
				graduateYear,
				telephone ,
				gender
			})

			// create response
			const response = {
				success: true,
				data: {
					user: newUser,
				},
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
					.regex(passwordRegex)
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
					token
				},
			}
			res.send(response)
		} catch (e) {
			console.log(e)
			res.send(createErrorResponse(e))
		}
	}



}