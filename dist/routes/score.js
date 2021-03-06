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
router.post('/', authenticate, (req, res) => {
  _controllers.scoreController.create(req, res);
});
router.get('/', authenticate, (req, res) => {
  _controllers.scoreController.findOne(req, res);
});
router.patch('/', authenticate, (req, res) => {
  _controllers.scoreController.update(req, res);
});
router.delete('/', authenticate, function (req, res) {
  _controllers.scoreController.delete(req, res);
});
/**
 * @swagger
 * 
 * /score:
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

/**
 * @swagger
 *
 * /score:
 *   post:
 *     tags:
 *       - score
 *     security:
 *       - bearerAuth: []
 *     summary: 성적 생성
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               korean:
 *                 type: json
 *                 description: 국어 ( score, grade, percentile)
 *               english:
 *                 type: json
 *                 description: 영어 ( grade )
 *               math:
 *                 type: json
 *                 description: 수학 ( score, grade, percentile , type)
 *               tamgu1:
 *                 type: json
 *                 description: 탐구1 ( score, grade, percentile , name )
 *               tamgu2:
 *                 type: json
 *                 description: 탐구2 ( score, grade, percentile , name)
 *               foreign:
 *                 type: json
 *                 description: 제2외국어 ( score, grade, percentile )
 *               history:
 *                 type: json
 *                 description: 한국사 ( grade )
 *               naesin:
 *                 type: float
 *                 description: 내신 점수
 *               naesin_type:
 *                 type: string
 *                 description: 국수영사
 *               line:
 *                 type: string
 *                 description: 문과
 *             required:
 *               - korean
 *               - english
 *               - math
 *               - tamgu1
 *               - tamgu2
 *               - history
 *               - foreign
 *               - line 
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

/**
 * @swagger
 *
 * /score:
 *   patch:
 *     tags:
 *       - score
 *     security:
 *       - bearerAuth: []
 *     summary: 성적 수정
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               korean:
 *                 type: json
 *                 description: 국어 ( score, grade, percentile)
 *               english:
 *                 type: json
 *                 description: 영어 ( grade )
 *               math:
 *                 type: json
 *                 description: 수학 ( score, grade, percentile , type)
 *               tamgu1:
 *                 type: json
 *                 description: 탐구1 ( score, grade, percentile , name )
 *               tamgu2:
 *                 type: string
 *                 description: 탐구2 ( score, grade, percentile , name)
 *               foreign:
 *                 type: json
 *                 description: 제2외국어 ( score, grade, percentile )
 *               history:
 *                 type: json
 *                 description: 한국사 ( grade )
 *               naesin:
 *                 type: float
 *                 description: 내신 점수
 *               naesin_type:
 *                 type: string
 *                 description: 국수영사
 *               line:
 *                 type: string
 *                 description: 문과
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

/**
 * @swagger
 *
 * /score:
 *   delete:
 *     tags:
 *       - score
 *     security:
 *       - bearerAuth: []
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

module.exports = router;