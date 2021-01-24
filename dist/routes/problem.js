"use strict";

var _multer = _interopRequireDefault(require("multer"));

var _multerS = _interopRequireDefault(require("multer-s3"));

var _path = _interopRequireDefault(require("path"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _Authenticator = _interopRequireDefault(require("../Authenticator"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _controllers = require("../controllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');

_dotenv.default.config();

const {
  authenticate
} = _Authenticator.default;
const s3 = new _awsSdk.default.S3({
  accessKeyId: 'AKIAIX4FWDLCK3FVJGIA',
  secretAccessKey: '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'
});
const upload = (0, _multer.default)({
  storage: (0, _multerS.default)({
    s3,
    bucket: 'mathproblem',
    acl: 'public-read',
    key: (req, file, cb) => {
      const today = new Date();
      today.setHours(today.getHours + 9);
      const timestamp = date_to_str(today);
      cb(null, `problem/${timestamp}_${file.originalname}`);
    }
  })
});
var router = express.Router();
router.post('/', upload.fields([{
  name: 'problem',
  maxCount: 1
}, {
  name: 'solution',
  maxCount: 1
}]), (req, res) => {
  console.log("why");

  _controllers.problemController.create(req, res);
});
router.post('/find', authenticate, (req, res) => {
  _controllers.problemController.findList(req, res);
});
router.get('/replace', authenticate, (req, res) => {
  _controllers.problemController.replace(req, res);
});

function date_to_str(format) {
  var year = format.getFullYear();
  var month = format.getMonth() + 1;
  if (month < 10) month = '0' + month;
  var date = format.getDate();
  if (date < 10) date = '0' + date;
  var hour = format.getHours();
  if (hour < 10) hour = '0' + hour;
  var min = format.getMinutes();
  if (min < 10) min = '0' + min;
  var sec = format.getSeconds();
  if (sec < 10) sec = '0' + sec;
  return year + "-" + month + "-" + date + "_" + hour + ":" + min + ":" + sec;
}

module.exports = router;