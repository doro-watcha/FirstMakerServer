import { reportController } from '../controllers'
import { Router } from 'express'

import Authenticator from '../Authenticator'

const { authenticate, getUserInfo } = Authenticator

const router  = Router()


/**
 * @swagger
 *
 * /report:
 *   get:
 *     tags:
 *       - report
 *     security:
 *       - bearerAuth: []
 *     summary: 레포트 리스트 조회
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
 *                     report:
 *                       $ref: '#/components/schemas/Report'
 *                   required:
 *                     - report
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

router.get('/', authenticate, (req,res) => {
  reportController.findList(req,res)
})

/**
 * @swagger
 *
 * /report/{id}:
 *   get:
 *     tags:
 *       - report
 *     security:
 *       - bearerAuth: []
 *     summary: 레포트 id별 조회
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
 *                     report:
 *                       $ref: '#/components/schemas/Report'
 *                   required:
 *                     - report
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

router.get('/:id' , (req,res) => {
  reportController.findReport(req,res)
})


/**
 * @swagger
 *
 * /report:
 *   post:
 *     tags:
 *       - report
 *     summary: 레포트 생성
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: integer
 *                 description: 점수
 *               majorId:
 *                 type: integer
 *                 description: 지원한 전공 ID값
 *               userId:
 *                 type: integer
 *                 description: 유조 ID값
 *             required:
 *               - score
 *               - majorId
 *               - userId
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
 *                     report:
 *                       $ref: '#/components/schemas/Report'
 *                   required:
 *                     - report
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
  reportController.createReport(req,res)
})

/**
 * @swagger
 *
 * /report/{id}:
 *   patch:
 *     tags:
 *       - report
 *     summary: 레포트 수정
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: integer
 *                 description: 점수
 *               majorId:
 *                 type: integer
 *                 description: 지원한 전공 ID값
 *               userId:
 *                 type: integer
 *                 description: 유조 ID값
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
 *                     report:
 *                       $ref: '#/components/schemas/Report'
 *                   required:
 *                     - report
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
  reportController.updateReport(req.res)
})

/**
 * @swagger
 *
 * /report/{id}:
 *   delete:
 *     tags:
 *       - report
 *     summary: 레포트 삭제
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
  reportController.deleteReport(req,res)
})


module.exports = router