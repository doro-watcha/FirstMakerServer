
var express = require('express');

import { universityController } from '../controllers'


var router = express.Router();

/**
 * @swagger
 *
 * /university:
 *   get:
 *     tags:
 *       - university
 *     summary: 대학 리스트 조회
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
 *                     university:
 *                       $ref: '#/components/schemas/University'
 *                   required:
 *                     - university
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


router.get('/', function(req, res) {
    universityController.findList(req, res)
})


/**
 * @swagger
 *
 * /university:
 *   post:
 *     tags:
 *       - university
 *     summary: 대학 정보 생성
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 대학 이름
 *               min:
 *                 type: string
 *                 description: 지원 안정 최저 점수
 *               max:
 *                 type: integer
 *                 description: 지원 안정 최고 점수
 *               location:
 *                 type: string
 *                 description: 위치
 *             required:
 *               - name
 *               - min
 *               - max
 *               - location
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
 *                     university:
 *                       $ref: '#/components/schemas/University'
 *                   required:
 *                     - university
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


router.post('/', (req,res) => {
    universityController.createUniversity(req,res)
})

/**
 * @swagger
 *
 * /university/{id}:
 *   patch:
 *     tags:
 *       - university
 *     summary: 대학 정보 수정
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 대학 이름
 *               min:
 *                 type: string
 *                 description: 지원 안정 최저 점수
 *               max:
 *                 type: integer
 *                 description: 지원 안정 최고 점수
 *               location:
 *                 type: string
 *                 description: 위치
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
 *                     university:
 *                       $ref: '#/components/schemas/University'
 *                   required:
 *                     - university
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


router.patch('/:id', (req,res) => {
    universityController.updateUniversity(req,res)
})

/**
 * @swagger
 *
 * /university/{id}:
 *   delete:
 *     tags:
 *       - university
 *     summary: 대학 정보 삭제

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


router.delete('/:id', (req,res) => {
    universityController.deleteUniversity(req,res)
})

module.exports = router
