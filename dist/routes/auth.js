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
  _controllers.authController.token(req, res);
});
router.post('/signup', (req, res) => {
  _controllers.authController.signUp(req, res);
});
router.post('/signin', (req, res) => {
  _controllers.authController.signIn(req, res);
});
router.patch('/reset', (req, res) => {
  _controllers.authController.resetPassword(req, res);
});
module.exports = router;