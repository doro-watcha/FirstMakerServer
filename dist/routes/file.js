"use strict";

var _express = require("express");

var _controllers = require("../controllers");

var _Authenticator = _interopRequireDefault(require("../Authenticator"));

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  authenticate
} = _Authenticator.default;
const router = new _express.Router();
const upload = (0, _multer.default)({
  storage: _multer.default.diskStorage({
    // set a localstorage destination
    destination: (req, file, cb) => {
      cb(null, '../file/');
    },
    // convert a file name
    filename: (req, file, cb) => {
      cb(null, "major" + _path.default.extname(file.originalname));
    }
  })
});
router.post('/major', authenticate, upload.fields([{
  name: 'excel',
  maxCount: 1
}]), (req, res) => {
  console.log("wow");

  _controllers.fileController.createMajorFile(req, res);
});
router.get('/major', (req, res) => {
  console.log("tlqkf");

  _controllers.fileController.getMajorFile(req, res);
});
router.delete('/major', (req, res) => {
  _controllers.fileController.deleteMajorFile(req, res);
});
router.post('/university', (req, res) => {
  _controllers.fileController.createUniversity(req, res);
});
router.get('/university', (req, res) => {
  _controllers.fileController.getUniversity(req, res);
});
router.delete('/university', (req, res) => {
  _controllers.fileController.deleteUniversity(req, res);
});
module.exports = router;