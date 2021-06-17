
import { Router } from 'express'
import { authController } from '../controllers'
import Authenticator from '../Authenticator'

const { authenticate } = Authenticator

const router = new Router()


router.get('/', authenticate, (req, res) => {
	authController.token(req, res)
})

router.post('/signup', (req, res) => {
	authController.signUp(req, res)
})


router.post('/signin', (req, res) => {
	authController.signIn(req, res)
})

router.patch('/reset', (req,res) => {
	authController.resetPassword(req,res)
})


module.exports = router