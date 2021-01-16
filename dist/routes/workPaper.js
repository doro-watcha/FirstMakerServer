"use strict";

var _express = require("express");

var _controllers = require("../controllers");

var _Authenticator = _interopRequireDefault(require("../Authenticator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  authenticate
} = _Authenticator.default;
var router = new _express.Router();
router.post('/', authenticate, (req, res) => {
  _controllers.workPaperController.create(req, res);
});
router.get('/:id', (req, res) => {
  _controllers.workPaperController.findOne(req, res);
});
router.get('/', authenticate, (req, res) => {
  _controllers.workPaperController.findList(req, res);
});
router.patch('/:id', (req, res) => {
  _controllers.workPaperController.update(req, res);
});
router.delete('/:id', authenticate, (req, res) => {
  _controllers.workPaperController.delete(req, res);
});
module.exports = router;