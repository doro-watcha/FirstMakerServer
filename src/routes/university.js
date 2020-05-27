
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var dbconfig = require('./database.js');
var conn = mysql.createConnection(dbconfig);

import { universityController } from '../controllers'

var app = express();

var router = express.Router();

/**
 * @swagger
 * 
 * /university:
 *   get:
 *     tags:
 *       - university
 *     security:
 *       - bearerAuth: []
 *     summary: 대학 정보
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: integer
 *                 description: 대학 이름
 *               line:
 *                 type : integer
 *                 description : 문/이과 ( 문 = 0 , 이 = 1)               
 *             required:
 *                  name,line
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
 *                       $ref: '#/components/schemas/University'
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

// 대학 클릭했을때 밑에 과 주르륵 나오는 api
router.get('/', function(req, res) {
    universityController.findList(req, res)
})

// 상세결과 눌렀을 때 예측하는 점수 넘겨주는 api
router.post('/predict', function(req,res){
    universityController.predict(req,res)
})

router.post('/admin', function(req,res){
    universityController.findAll(req,res)
})

module.exports = router
