import { Router } from 'express'
import { academyController } from '../controllers'
import Authenticator from '../Authenticator'

const { authenticate } = Authenticator

const router = new Router()

/**
 * @swagger
 *
 * /academy:
 *   get:
 *     tags:
 *       - academy
 *     summary: 모든 학원 리스트 조회 
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
 *                     academy:
 *                       $ref: '#/components/schemas/Academy'
 *                   required:
 *                     - academy
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


router.get('/' , (req,res) => {
  academyController.findAll(req,res)
})


/**
 * @swagger
 *
 * /academy/{id}:
 *   get:
 *     tags:
 *       - academy
 *     summary: 학원 id 별 조회 
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
 *                     academy:
 *                       $ref: '#/components/schemas/Academy'
 *                   required:
 *                     - academy
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
  academyController.findOne(req,res)
})


/**
 * @swagger
 *
 * /academy:
 *   post:
 *     tags:
 *       - academy
 *     summary: 학원 생성
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 학원 이름
 *               password:
 *                 type: string
 *                 description: 비밀번호
 *             required:
 *               - name
 *               - password
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

router.post('/' , (req,res) => {
  academyController.create(req,res)
})

/**
 * @swagger
 *
 * /academy/{id}:
 *   patch:
 *     tags:
 *       - academy
 *     summary: 학원 수정
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 학원 이름
 *               password:
 *                 type: string
 *                 description: 비밀번호
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
 *                     academy:
 *                       $ref: '#/components/schemas/Academy'
 *                   required:
 *                     - academy
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
router.patch('/:id' , (req,res) => {
  academyController.update(req,res)
})

/**
 * @swagger
 *
 * /academy/{id}:
 *   delete:
 *     tags:
 *       - academy
 *     summary: 학원 삭제
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

router.delete('/:id' , (req,res) => {
  academyController.delete(req,res)
})

module.exports = router