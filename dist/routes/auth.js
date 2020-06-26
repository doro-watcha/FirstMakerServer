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
 *       'ecode: 203':
 *         description: 새로운 약관이 있을 경우
 *       'ecode: 700':
 *         description: 서버 에러
 */

router.get('/', authenticate, (req, res) => {
  console.log("fuckfuck");

  _controllers.authController.token(req, res);
});
router.post('/signup', (req, res) => {
  _controllers.authController.signUp(req, res);
});
router.post('/signin', (req, res) => {
  _controllers.authController.signIn(req, res);
});
module.exports = router;