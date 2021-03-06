"use strict";

var _controllers = require("../controllers");

var _express = require("express");

var _Authenticator = _interopRequireDefault(require("../Authenticator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  authenticate,
  getUserInfo
} = _Authenticator.default;
const router = (0, _express.Router)();
router.post('/', authenticate, (req, res) => {
  _controllers.reportController.create(req, res);
});
router.get('/:id', (req, res) => {
  _controllers.reportController.findOne(req, res);
});
router.get('/', authenticate, (req, res) => {
  _controllers.reportController.findList(req, res);
});
router.patch('/:id', authenticate, (req, res) => {
  _controllers.reportController.update(req, res);
});
router.delete('/:id', (req, res) => {
  _controllers.reportController.delete(req, res);
});
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

/**
 * @swagger
 *
 * /report:
 *   post:
 *     tags:
 *       - report
 *     summary: 레포트 생성
 *     security:
 *       - bearerAuth: []
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
 *             required:
 *               - score
 *               - majorId
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

module.exports = router;