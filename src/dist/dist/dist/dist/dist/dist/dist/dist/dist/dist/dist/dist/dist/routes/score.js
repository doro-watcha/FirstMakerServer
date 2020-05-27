"use strict";

var _controllers = require("../controllers");

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var router = _express.default.Router();
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
// 내 점수 불러오는 api


router.get('/', function (req, res) {
  _controllers.scoreController.getScore(req, res);
}); // 내 점수 db에 박는 api

router.post('/', function (req, res) {
  _controllers.scoreController.setScore(req, res);
});
/**
 * @swagger
 * 
 * /score/translate:
 *   post:
 *     tags:
 *       - score
 *     security:
 *       - bearerAuth: []
 *     summary: 내 점수 변환
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               korean:
 *                 type: integer
 *                 description: 국어점수
 *               english:
 *                 type: integer
 *                 description: 영어등급
 *               math:
 *                 type: integer
 *                 description: 수학점수
 *               history:
 *                 type: integer
 *                 description : 역사등급
 *               tamgu1:
 *                 type : integer
 *                 description : 탐구 1 점수
 *               tamgu2:
 *                 type : integer
 *                 description : 탐구 2 점수
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
 *                   type: integer
 *                   sample : 583
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
// 대학 list 보여줄때 자신의 점수 계산해서 던져주는 api

router.post('/translate', function (req, res) {
  _controllers.scoreController.translateScore(req, res);
});
module.exports = router;