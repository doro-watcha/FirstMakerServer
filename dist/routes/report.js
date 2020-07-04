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
router.get('/', (req, res) => {
  _controllers.reportController.findList(req, res);
});
router.get('/:id', (req, res) => {
  _controllers.reportController.findReport(req, res);
});
router.post('/', (req, res) => {
  _controllers.reportController.createReport(req, res);
});
router.patch('/:id', (req, res) => {
  _controllers.reportController.updateReport(req.res);
});
router.delete('/:id', (req, res) => {
  _controllers.reportController.deleteReport(req, res);
});
module.exports = router;