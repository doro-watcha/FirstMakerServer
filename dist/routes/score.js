"use strict";

var _controllers = require("../controllers");

var _express = require("express");

var _Authenticator = _interopRequireDefault(require("../Authenticator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  authenticate,
  getUserInfo
} = _Authenticator.default;
const router = (0, _express.Router)();
/**
 * @swagger
 * 
 * /score/{userId}:
 *   get:
 *     tags:
 *       - score
 *     security:
 *       - bearerAuth: []
 *     summary: 내 점수 정보
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *             required:
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
 *                      result:
 *                       $ref: '#/components/schemas/Score'
 *               required:
 *                 - success
 *                 - data
 *       'ecode: 201':
 *         description: 유효하지 않은 토큰
 *       'ecode: 100':
 *         description: Request Body Validation 실패
 *       'ecode: 422':
 *         description: 존재하지 않는 태그일 경우
 *       'ecode: 700':
 *         description: 서버 에러
 */

router.get('/:userId', getUserInfo, (req, res) => {
  _controllers.scoreController.findScore(req, res);
});
/**
 * @swagger
 *
 * /score:
 *   post:
 *     tags:
 *       - score
 *     summary: 성적 생성
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: integer
 *                 description: 표준점수
 *               grade:
 *                 type: integer
 *                 description: 등급
 *               percentile:
 *                 type: integer
 *                 description: 백분위
 *               type:
 *                 type: string
 *                 description: 문/이과
 *             required:
 *               - score
 *               - grade
 *               - percentile
 *               - type
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
 *                     score:
 *                       $ref: '#/components/schemas/Score'
 *                   required:
 *                     - score
 *               required:
 *                 - success
 *                 - data
 *       'ecode: 201':
 *         description: 유효하지 않은 토큰
 *       'ecode: 100':
 *         description: Request Body Validation 실패
 *       'ecode: 700':
 *         description: 서버 에러
 */

router.post('/', authenticate, (req, res) => {
  _controllers.scoreController.createScore(req, res);
});
/**
 * @swagger
 *
 * /score/{userId}:
 *   patch:
 *     tags:
 *       - score
 *     summary: 성적 수정
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: integer
 *                 description: 표준점수
 *               grade:
 *                 type: integer
 *                 description: 등급
 *               percentile:
 *                 type: integer
 *                 description: 백분위
 *               type:
 *                 type: string
 *                 description: 문/이과
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
 *                     score:
 *                       $ref: '#/components/schemas/Score'
 *                   required:
 *                     - score
 *               required:
 *                 - success
 *                 - data
 *       'ecode: 201':
 *         description: 유효하지 않은 토큰
 *       'ecode: 100':
 *         description: Request Body Validation 실패
 *       'ecode: 700':
 *         description: 서버 에러
 */

router.patch('/:userId', (req, res) => {
  _controllers.scoreController.updateScore(req, res);
});
/**
 * @swagger
 *
 * /score/{userId}:
 *   delete:
 *     tags:
 *       - score
 *     summary: 성적 삭제
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
 *       'ecode: 100':
 *         description: Request Body Validation 실패
 *       'ecode: 700':
 *         description: 서버 에러
 */

router.delete('/:userId', function (req, res) {
  _controllers.scoreController.deleteScore(req, res);
});
module.exports = router;