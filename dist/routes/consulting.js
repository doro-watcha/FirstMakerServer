"use strict";

var _express = require("express");

var _controllers = require("../controllers");

var _Authenticator = _interopRequireDefault(require("../Authenticator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  authenticate
} = _Authenticator.default;
const router = new _express.Router();
router.get('/', authenticate, (req, res) => {
  _controllers.consultingController.findList(req, res);
});
router.get('/:id', (req, res) => {
  _controllers.consultingController.findOne(req, res);
});
router.post('/', (req, res) => {
  _controllers.consultingController.createConsulting(req, res);
});
router.patch('/:id', (req, res) => {
  _controllers.consultingController.updateConsulting(req, res);
});
router.delete('/:id', (req, res) => {
  _controllers.consultingController.deleteConsulting(req, res);
});
module.exports = router;