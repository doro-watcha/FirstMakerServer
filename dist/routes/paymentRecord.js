"use strict";

var _controllers = require("../controllers");

var _express = require("express");

var _Authenticator = _interopRequireDefault(require("../Authenticator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  authenticate,
  getUserInfo
} = _Authenticator.default;
const router = (0, _express.Router)();
router.get('/', authenticate, (req, res) => {
  _controllers.paymentRecordController.findList(req, res);
});
router.get('/:id', authenticate, (req, res) => {
  _controllers.paymentRecordController.findOne(req, res);
});
router.post('/', authenticate, (req, res) => {
  _controllers.paymentRecordController.create(req, res);
});
router.patch('/:id', authenticate, (req, res) => {
  _controllers.paymentRecordController.update(req, res);
});
router.delete('/:id', authenticate, (req, res) => {
  _controllers.paymentRecordController.delete(req, res);
});
module.exports = router;