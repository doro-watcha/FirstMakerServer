"use strict";

var _express = require("express");

var _controllers = require("../controllers");

var _Authenticator = _interopRequireDefault(require("../Authenticator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  authenticate
} = _Authenticator.default;
const router = new _express.Router();
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
 *       'ecode: 700':
 *         description: 서버 에러
 */

router.get('/', authenticate, (req, res) => {
  _controllers.authController.token(req, res);
});
/**
 * @swagger
 *
 * /auth/signup:
 *   post:
 *     tags:
 *      - auth
 *     summary: 이메일 회원가입
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 description: 8-20 문자, 숫자, 특수문자(!@#$%^&) 조합, (영문자, 숫자, 특수문자는 반드시 1개 이상 포함)
 *             required:
 *               - email
 *               - password
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
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                   required:
 *                     - user
 *               required:
 *                 - success
 *                 - data
 *       'ecode: 100':
 *         description: Request Body Validation 실패
 *       'ecode: 500':
 *         description: 이미 존재하는 이메일일 경우
 *       'ecode: 700':
 *         description: 서버 에러
 */

router.post('/signup', (req, res) => {
  _controllers.authController.signUp(req, res);
});
/**
 * @swagger
 *
 * /auth/signin:
 *   post:
 *     summary: 이메일 로그인
 *     tags:
 *      - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 description: 8-20 문자, 숫자, 특수문자(!@#$%^&) 조합, (영문자, 숫자, 특수문자는 반드시 1개 이상 포함)
 *             required:
 *               - email
 *               - password
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
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                   required:
 *                     - token
 *               required:
 *                 - success
 *                 - data
 *       'ecode: 100':
 *         description: Request Body Validation 실패
 *       'ecode: 200':
 *         description: 비밀번호가 틀릴 경우
 *       'ecode: 402':
 *         description: 가입되지 않은 이메일로 로그인할 경우
 *       'ecode: 700':
 *         description: 서버 에러
 */

router.post('/signin', (req, res) => {
  _controllers.authController.signIn(req, res);
});
module.exports = router;