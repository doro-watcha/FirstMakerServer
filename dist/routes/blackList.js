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
  _controllers.blackListController.create(req, res);
});
router.get('/', authenticate, (req, res) => {
  _controllers.blackListController.findList(req, res);
});
router.patch('/', (req, res) => {
  _controllers.blackListController.update(req, res);
});
router.get('/:id', (req, res) => {
  _controllers.blackListController.findOne(req, res);
});
module.exports = router;