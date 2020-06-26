import { Router } from 'express'
import { authController } from '../controllers'
import Authenticator from '../Authenticator'

const { authenticate } = Authenticator

const router = new Router()

/**
 * @swagger
 *
 * /auth:
 *   get:
 *     tags:
 *       - auth
 *     security:
 *       - bearerAuth: []
 *     summary: 토큰 확인 (자동 로그인)
 *     responses:
 *       SUCCESS:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *               required:
 *                 - success
 *       'ecode: 201':
 *         description: 유효하지 않은 토큰
 *       'ecode: 203':
 *         description: 새로운 약관이 있을 경우
 *       'ecode: 700':
 *         description: 서버 에러
 */
router.get('/', authenticate, (req, res) => {
  console.log("fuckfuck")
	authController.token(req, res)
})


router.post('/signup', (req, res) => {
	authController.signUp(req, res)
})


router.post('/signin', (req, res) => {
	authController.signIn(req, res)
})

module.exports = router;