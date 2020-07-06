import { reflectionRatioController } from '../controllers'
import { Router } from 'express'

import Authenticator from '../Authenticator'

const { authenticate, getUserInfo } = Authenticator

const router  = Router()


/**
 * @swagger
 *
 * /reflectionRatio:
 *   get:
 *     tags:
 *       - ReflectionRatio
 *     summary: 계산된 반영비율 및 표준점수 조회
 *     parameters:
 *       - in: query
 *         name: univId
 *         schema:
 *           type: integer
 *         required: true
 *         description: 대학 ID
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: 유저 ID
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
 *                     reflectionRatio:
 *                       $ref: '#/components/schemas/ReflectionRatio'
 *                     score:
 *                       $ref: '#/components/schemas/Score'
 *                     calculatedScore:
 *                       type : json
 *                   required:
 *                     - reflectionRatio
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
  reflectionRatioController.calculate(req,res)
})


/**
 * @swagger
 *
 * /reflectionRatio/{id}:
 *   get:
 *     tags:
 *       - ReflectionRatio
 *     summary: 반영비율 id별 조회
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
 *                     reflectionRatio:
 *                       $ref: '#/components/schemas/ReflectionRatio'
 *                   required:
 *                     - reflectionRatio
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
  reflectionRatioController.findOne(req,res)
})



/**
 * @swagger
 *
 * /reflectionRatio:
 *   post:
 *     tags:
 *       - ReflectionRatio
 *     summary: 반영 비율 생성
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               metadata:
 *                 type: json
 *                 description: applicationIndicator  활용지표 ex)표+백 , reflectionSubject  반영과목 ex) 국수영탐 , reflectionNumber  반영갯수 , applyingNumber  응시갯수
 *               ratio:
 *                 type: json
 *                 description: korean , math, type(가 or 나) , english , tamgu, job(직업탐구), foreign, history 반영비율 (integer 값)
 *               description:
 *                 type: json
 *                 description: englsih 영어 과목 설명 ex) 영어 20& 반영 , history 국사 과목 설명 , extra 수능 가감점 설명, somethingSpecial  수능 특이사항
 *               minGrade:
 *                 type: json
 *                 description: englsih  영어 수능 최저 등급 , history 국사 수능 최저 등급
 *               extraRatio:
 *                 type: json
 *                 description: korean  국어 가산점 비율 , english  영어 가산점 비율 , math  수학 가산점 비율, tamgu  탐구 가산점 비율 
 *               perfectScore:
 *                 type: json
 *                 description: korean  국어 표준점수 만점 , english  영어 표준점수 만점, math  수학 표준점수 만점, tamgu  탐구 표준점수 만점
 *               totalScore:
 *                 type: integer
 *                 description: 표준점수 만점,
 *               gradeToScore:
 *                 type: json
 *                 description: english , history가 있는데 배열로 저장 ( 0번 인덱스틑 1등급에 해당하는 표준점수가 들어있음)
 *               gradeToPercentile:
 *                 type: json
 *                 description: korean, english, tamgu, math 가 있는데 applicationIndicator에 백분위가 들어있을경우 이 기준에 의해서 표준점수를 구함
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
 *                     reflectionRatio:
 *                       $ref: '#/components/schemas/ReflectionRatio'
 *                   required:
 *                     - reflectionRatio
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
  reflectionRatioController.create(req,res)
})

/**
 * @swagger
 *
 * /reflectionRatio/{id}:
 *   patch:
 *     tags:
 *       - ReflectionRatio
 *     summary: 반영 비율 수정
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               metadata:
 *                 type: json
 *                 description: applicationIndicator  활용지표 ex)표+백 , reflectionSubject  반영과목 ex) 국수영탐 , reflectionNumber  반영갯수 , applyingNumber  응시갯수
 *               ratio:
 *                 type: json
 *                 description: korean , math, type(가 or 나) , english , tamgu, job(직업탐구), foreign, history 반영비율 (integer 값)
 *               description:
 *                 type: json
 *                 description: englsih 영어 과목 설명 ex) 영어 20& 반영 , history 국사 과목 설명 , extra 수능 가감점 설명, somethingSpecial  수능 특이사항
 *               minGrade:
 *                 type: json
 *                 description: englsih  영어 수능 최저 등급 , history 국사 수능 최저 등급
 *               extraRatio:
 *                 type: json
 *                 description: korean  국어 가산점 비율 , english  영어 가산점 비율 , math  수학 가산점 비율, tamgu  탐구 가산점 비율 
 *               perfectScore:
 *                 type: json
 *                 description: korean  국어 표준점수 만점 , english  영어 표준점수 만점, math  수학 표준점수 만점, tamgu  탐구 표준점수 만점
 *               totalScore:
 *                 type: integer
 *                 description: 표준점수 만점,
 *               gradeToScore:
 *                 type: json
 *                 description: english , history가 있는데 배열로 저장 ( 0번 인덱스틑 1등급에 해당하는 표준점수가 들어있음)
 *               gradeToPercentile:
 *                 type: json
 *                 description: korean, english, tamgu, math 가 있는데 applicationIndicator에 백분위가 들어있을경우 이 기준에 의해서 표준점수를 구함
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
 *                     reflectionRatio:
 *                       $ref: '#/components/schemas/ReflectionRatio'
 *                   required:
 *                     - reflectionRatio
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
  reflectionRatioController.update(req,res)
})


/**
 * @swagger
 *
 * /reflectionRatio/{id}:
 *   delete:
 *     tags:
 *       - ReflectionRatio
 *     summary: 반영 비율 삭제
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
  reflectionRatioController.delete(req,res)
})

module.exports = router