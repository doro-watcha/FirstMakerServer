"use strict";

var _express = require("express");

var _controllers = require("../controllers");

var router = new _express.Router();
router.get('/', (req, res) => {
  _controllers.userController.findList(req, res);
});
router.patch('/:id', (req, res) => {
  _controllers.userController.update(req, res);
});
router.delete('/:id', (req, res) => {
  _controllers.userController.delete(req, res);
});
router.get('/searchStudent', (req, res) => {
  _controllers.userController.searchByStudentName(req, res);
});
/**
 * @swagger
 *
 * /user:
 *   get:
 *     tags:
 *       - user
 *     summary: 유저 리스트 조회
 *     parameters:
 *       - academyId:
 *         $ref: '#/components/parameters/academyId'
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

/**
 * @swagger
 *
 * /user/{id}:
 *   patch:
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
 *               graduateYear:
 *                 type: integer
 *                 description: 졸업년도
 *               haknyeon:
 *                 type: string
 *                 description: 학년
 *               predictTimes:
 *                 type: integer
 *                 description: 예측 가능 횟수
 *               gender:
 *                 type: string
 *                 description: 성별
 *               telephone:
 *                 type: integer
 *                 description: 전화번호
 *               academyId:
 *                 type: integer
 *                 description: 학원 id
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

module.exports = router;