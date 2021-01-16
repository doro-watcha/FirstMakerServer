"use strict";

var _Authenticator = _interopRequireDefault(require("../Authenticator"));

var _controllers = require("../controllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');

const {
  authenticate
} = _Authenticator.default;
var router = express.Router();
router.post('/', (req, res) => {
  _controllers.problemController.create(req, res);
});
router.post('/find', authenticate, (req, res) => {
  _controllers.problemController.findList(req, res);
});
router.get('/replace', authenticate, (req, res) => {
  _controllers.problemController.replace(req, res);
});
module.exports = router;