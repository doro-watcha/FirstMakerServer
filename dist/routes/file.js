"use strict";

var _express = require("express");

var _controllers = require("../controllers");

var _Authenticator = _interopRequireDefault(require("../Authenticator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  authenticate
} = _Authenticator.default;
const router = new _express.Router();
router.post('/major', (req, res) => {
  _controllers.fileController.createMajor(req, res);
});
router.get('/major', (req, res) => {
  console.log("tlqkf");

  _controllers.fileController.getMajor(req, res);
});
router.delete('/major', (req, res) => {
  _controllers.fileController.deleteMajor(req, res);
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