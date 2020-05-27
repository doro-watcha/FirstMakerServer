"use strict";

var _controllers = require("../../controllers");

var mysql = require('mysql');

var express = require('express');

var bodyParser = require('body-parser');

var dbconfig = require('../database.js');

var conn = mysql.createConnection(dbconfig);
var app = express();
var router = express.Router();
router.post('/get', function (req, res) {
  var accountId = req.body.id;
  var query = conn.query(`SELECT subject,type, score, grade, percentile FROM score WHERE accountId=` + mysql.escape(accountId), function (err, result) {
    console.log(result);
    res.send(result);
  });
});
router.post('/set', function (req, res) {
  req.body.array.forEach(element => {
    console.log(element);
  });
});
router.post('/graph', function (req, res) {
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
router.post('/list', function (req, res) {
  var type = req.body.type;
  var query = conn.query(`SELECT major,name from university WHERE type=` + mysql.escape(type), function (err, result) {
    var new_result = result.filter;
    console.log(err);
    console.log(result);
    var object = {
      "list": result,
      "success": true
    };
    res.send(object);
  });
});
/**
 * @swagger
 * 
 * /university/predict:
 *   post:
 *     tags:
 *       - video
 *     security:
 *       - bearerAuth: []
 *     summary: 비디오 생성
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               partId:
 *                 type: integer
 *                 description: 파트 ID
 *               description:
 *                 type: string
 *                 description: 영상 설명
 *               tags:
 *                 type: string
 *                 description: 태그 목록
 *               video:
 *                 type: file
 *                 description: 비디오 파일
 *               posterImg:
 *                 type: file
 *                 description: 썸네일 이미지 파일
 *             required:
 *               - partId
 *               - video
 *               - posterImg
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
 *                     video:
 *                       $ref: '#/components/schemas/Video'
 *                   required:
 *                     - video
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

router.post('/predict', function (req, res) {
  console.log(req.body);
  var name = req.body.name;
  var major = req.body.major;
  var type = req.body.type;
  var query = conn.query(`SELECT strong_val , safe_val, dangerous_val, sniping_val FROM university WHERE name=` + mysql.escape(name) + `AND major=` + mysql.escape(major) + `AND type=` + mysql.escape(type), function (err, result) {
    console.log(result);
    var object = {
      "value": result,
      "success": true
    };
    res.send(object);
  });
});
router.post('/get2', (req, res) => {
  console.log("good");

  _controllers.universityController.predict(req, res);
});
module.exports = router;