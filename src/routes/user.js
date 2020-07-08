var express = require('express');

import { userController } from '../controllers'


var router = express.Router();

/**
 * @swagger
 *
 * /user/{id}:
 *   get:
 *     tags:
 *       - user
 *     summary: 유저 정보 조회
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
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                   required:
 *                     - user
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

router.get('/:id', (req,res) => {
  userController.findUser(req,res)
})

/**
 * @swagger
 *
 * /user/{id}:
 *   post:
 *     tags:
 *       - user
 *     summary: 유저 정보 수정
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 유저 이름
 *               highSchool:
 *                 type: string
 *                 description: 고등학교 이름 
 *               line:
 *                 type: string
 *                 description: 문/이과
 *               predictTimes:
 *                 type: integer
 *                 description: 예측 가능 횟수
 *               gender:
 *                 type: string
 *                 description: 성별
 *               telephone:
 *                 type: integer
 *                 description: 전화번호
 * 
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
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                   required:
 *                     - user
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


router.patch('/:id', (req, res) => {
  userController.updateUser(req,res)
})

/**
 * @swagger
 *
 * /user/{id}:
 *   delete:
 *     tags:
 *       - user
 *     summary: 유저 정보 삭제
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




router.delete('/:id', (req, res) => {
  userController.deleteUser(req,res)
})

/**
 * @swagger
 *
 * /user:
 *   get:
 *     tags:
 *       - user
 *     summary: 유저 조건별 조회 
 *     parameters:
 *       - in: query
 *         name: academyId
 *         schema:
 *           type: integer
 *         required: false
 *         description: 학원 ID
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
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                   required:
 *                     - user
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

router.get('/', (req,res) => {
  userController.searchUser(req,res)
})

module.exports = router
