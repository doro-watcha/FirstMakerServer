"use strict";

var _controllers = require("../controllers");

var _Authenticator = _interopRequireDefault(require("../Authenticator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');

const {
  authenticate,
  getUserInfo
} = _Authenticator.default;
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

router.get('/:univId', authenticate, (req, res) => {
  _controllers.majorController.findList(req, res);
});
router.post('/', (req, res) => {
  _controllers.majorController.createMajor(req, res);
});
router.patch('/', (req, res) => {
  _controllers.majorController.updateMajor(req, res);
});
router.delete('/', (req, res) => {
  _controllers.majorController.deleteMajor(req, res);
});
module.exports = router;