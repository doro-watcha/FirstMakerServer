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
 *       required: true
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


router.get('/', function (req, res) {
  _controllers.scoreController.getScore(req, res);
});
router.post('/', function (req, res) {
  _controllers.scoreController.setScore(req, res);
});
module.exports = router;