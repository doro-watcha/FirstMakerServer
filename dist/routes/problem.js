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
      console.log(Date().toLocaleLowerCase());
      const timestamp = getToday(Date().toLocaleLowerCase());
      console.log(timestamp);
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

function getToday() {
  var date = new Date();
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);
  var hour = date.getHours();
  if (hour < 10) hour = "0" + hour;
  var minute = date.getMinutes();
  if (minute < 10) minute = "0" + minute;
  var second = date.getSeconds();
  if (second < 10) second = "0" + second;
  return year + "-" + month + "-" + day + "_" + hour + ":" + minute + ":" + second;
}

module.exports = router;