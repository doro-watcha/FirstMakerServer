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
}); // 대학 list 보여줄때 자신의 점수 계산해서 던져주는 api

router.post('/translate', function (req, res) {
  console.log("fuck");
  var korean = req.body.korean;
  var math = req.body.math;
  var english = req.body.english;
  var history = req.body.history;
  var tamgu1 = req.body.tamgu1;
  var tamgu2 = req.body.tamgu2;
  var new_korean = parseInt(korean.score * 357.1 / 200);
  var new_math = parseInt(math.score * 357.1 / 200);
  var new_tamgu = parseInt((tamgu1.score + tamgu2.score) * 285.7 / 200);
  var new_english = english.grade * 2 - 3;
  var new_history = 0;
  if (history.grade < 4) new_history = 10;else if (history.grade > 3 && history.grade < 8) {
    new_history = 10 - 0.2 * (history.grade - 3);
  } else new_history = 9;
  console.log(new_korean);
  console.log(new_math);
  var total = new_korean + new_math + new_tamgu - new_english + new_history;
  var object = {
    "total": total,
    "success": true
  };
  res.send(object);
});
module.exports = router;