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
  _controllers.noteController.create(req, res);
});
router.get('/list/wrong', authenticate, (req, res) => {
  _controllers.noteController.findWrongList(req, res);
});
router.get('/list/star', authenticate, (req, res) => {
  _controllers.noteController.findStarList(req, res);
});
router.get('/list/long', authenticate, (req, res) => {
  _controllers.noteController.findLongList(req, res);
});
router.get('/', authenticate, (req, res) => {
  _controllers.noteController.findList(req, res);
});
router.patch('/', (req, res) => {
  _controllers.noteController.update(req, res);
});
router.get('/:id', (req, res) => {
  _controllers.noteController.findOne(req, res);
});
module.exports = router;