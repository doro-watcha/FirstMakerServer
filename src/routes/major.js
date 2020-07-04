
var express = require('express');

import { majorController } from '../controllers'
import Authenticator from '../Authenticator'

const { authenticate, getUserInfo } = Authenticator


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


router.get('/:univId', authenticate, (req,res) =>{
  majorController.findList(req,res)
})

router.post('/', (req,res) => {
  majorController.createMajor(req,res)
})

router.patch('/', (req, res) => {
  majorController.updateMajor(req,res)
})

router.delete('/', (req,res) => {
  majorController.deleteMajor(req,res)
})


module.exports = router
