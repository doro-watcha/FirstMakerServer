import crypto from 'crypto'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import moment from 'moment-timezone'
dotenv.config()

import { userService } from '../services'
import { errors } from './variables'

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
	host: 'email-smtp.us-east-1.amazonaws.com',
	port: 465,
	secure: true, // true for 465, false for other ports
	auth: {
		user: 'AKIA2P2EDJNQDWMSH7CT',
		pass: 'BMGTznZfR+Eu8eOPQEmnoSSbfN+plY6ruX69cr+Efecq',
	},
})

module.exports = {
	createErrorResponse: (e) => {
		// log error
		console.error(e)

		try {
			// INVALID_REQUEST
			const ecode = e.isJoi ? 102 : errors[e.message].status ? errors[e.message].status : 700
			const message = e.isJoi ? e.details[0].message : errors[e.message].ko

			// error response
			return {
				success: false,
				ecode,
				message,
			}
		} catch (e) {
			return {
				success: false,
				ecode: 700,
				message:'서버 오류',
			}
		}
	}
}