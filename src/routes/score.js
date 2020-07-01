import { scoreController } from '../controllers'
import { Router } from 'express'

import Authenticator from '../Authenticator'

const { authenticate, getUserInfo } = Authenticator

const router  = Router()


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


router.get('/:userId', getUserInfo, (req, res) => {
    scoreController.findScore(req,res)
})

// 내 점수 db에 박는 api
router.post('/', authenticate , (req, res) => {
    scoreController.createScore(req,res)
})

router.patch('/:userId', (req, res) => {
    scoreController.updateScore(req,res)
})

router.delete('/:userId', function(req,res) {
    scoreController.deleteScore(req,res)
})

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
 *       required: true
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
 *             required: korean, english, math, history, tamgu1, tamgu2
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
 *                   example : 583
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




module.exports = router
