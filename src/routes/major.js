
import express from'express'
import multer from 'multer'
import path from 'path'

import { majorController } from '../controllers'
import Authenticator from '../Authenticator'

const { authenticate, getUserInfo } = Authenticator


var router = express.Router()

const upload = multer({
  storage: multer.diskStorage({
    // set a localstorage destination
    destination: (req, file, cb) => {
      cb(null, '../file/');
    },
    // convert a file name
    filename: (req, file, cb) => {
      cb(null, "major" + path.extname(file.originalname))
    },
  }),
})

router.get('/', (req,res) => {
  majorController.findAll(req,res)
})

/**
 * @swagger
 *
 * /major/{univId}:
 *   get:
 *     tags:
 *       - major
 *     summary: 대학별 학과 조회 
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
 *                     major:
 *                       $ref: '#/components/schemas/Major'
 *                   required:
 *                     - major
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

router.get('/:univId', authenticate, (req,res) =>{
  majorController.findList(req,res)
})

/**
 * @swagger
 *
 * /major:
 *   post:
 *     tags:
 *       - major
 *     summary: 학과 정보 생성
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 학과 이름
 *               year:
 *                 type: integer
 *                 description: 해당 년도
 *               line:
 *                 type: string
 *                 description: 문/이과
 *               group:
 *                 type: string
 *                 description: 모집 군별
 *               admissionType:
 *                 type: string
 *                 description: 모집 전형
 *               recruitmentNumber:
 *                 type: integer
 *                 description: 최초 모집 인원
 *               additionalMember:
 *                 type: integer
 *                 description: 수시 이월 인원
 *               competitionNumber:
 *                 type: float
 *                 description: 경쟁률
 *               isNaesinIncluded:
 *                 type: boolean
 *                 description: 내신이 포함되는지 아닌지
 *               majorCode:
 *                 type: integer
 *                 description: 학과 코드
 *               strong_val:
 *                 type: string
 *                 description: 유력 점수
 *               safe_val:
 *                 type: integer
 *                 description: 안정 점수
 *               dangerous_val:
 *                 type: integer
 *                 description: 불안정 점수
 *               sniping_val:
 *                 type: integer
 *                 description: 스나이퍼 점수
 *               somethingSpecial:
 *                 type: string
 *                 description: 특이사항
 *               etc:
 *                 type: string
 *                 description: 비고
 *               univId:
 *                 type: integer
 *                 description: 대학 Id
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
 *                     major:
 *                       $ref: '#/components/schemas/Major'
 *                   required:
 *                     - major
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
  majorController.createMajor(req,res)
})

/**
 * @swagger
 *
 * /major/{id}:
 *   patch:
 *     tags:
 *       - major
 *     summary: 학과 정보 수정
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 학과 이름
 *               year:
 *                 type: integer
 *                 description: 해당 년도
 *               line:
 *                 type: string
 *                 description: 문/이과
 *               group:
 *                 type: string
 *                 description: 모집 군별
 *               admissionType:
 *                 type: string
 *                 description: 모집 전형
 *               recruitmentNumber:
 *                 type: integer
 *                 description: 최초 모집 인원
 *               additionalMember:
 *                 type: integer
 *                 description: 수시 이월 인원
 *               competitionNumber:
 *                 type: float
 *                 description: 경쟁률
 *               isNaesinIncluded:
 *                 type: boolean
 *                 description: 내신이 포함되는지 아닌지
 *               majorCode:
 *                 type: integer
 *                 description: 학과 코드
 *               strong_val:
 *                 type: string
 *                 description: 유력 점수
 *               safe_val:
 *                 type: integer
 *                 description: 안정 점수
 *               dangerous_val:
 *                 type: integer
 *                 description: 불안정 점수
 *               sniping_val:
 *                 type: integer
 *                 description: 스나이퍼 점수
 *               somethingSpecial:
 *                 type: string
 *                 description: 특이사항
 *               etc:
 *                 type: string
 *                 description: 비고
 *               univId:
 *                 type: integer
 *                 description: 대학 Id
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
 *                     major:
 *                       $ref: '#/components/schemas/Major'
 *                   required:
 *                     - major
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
  majorController.updateMajor(req,res)
})

/**
 * @swagger
 *
 * /major/{id}:
 *   delete:
 *     tags:
 *       - major
 *     summary: 학과 정보 삭제
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
  majorController.deleteMajor(req,res)
})

router.post('/file' ,authenticate, upload.fields([{ name: 'excel', maxCount: 1 }]), (req,res) => {
  majorController.createFile(req,res)
})

module.exports = router
