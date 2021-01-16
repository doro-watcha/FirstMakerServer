"use strict";

var _express = require("express");

var _Authenticator = _interopRequireDefault(require("../Authenticator"));

var _controllers = require("../controllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  authenticate
} = _Authenticator.default;
var router = new _express.Router();
router.post('/', authenticate, (req, res) => {
  _controllers.homeworkController.create(req, res);
});
router.get('/', (req, res) => {
  _controllers.homeworkController.findList(req, res);
});
router.get('/:id', (req, res) => {
  _controllers.homeworkController.findOne(req, res);
});
router.delete('/:id', (req, res) => {
  _controllers.homeworkController.delete(req, res);
});
module.exports = router;