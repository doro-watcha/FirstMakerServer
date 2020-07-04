"use strict";

var _university = _interopRequireDefault(require("./university"));

var _score = _interopRequireDefault(require("./score"));

var _auth = _interopRequireDefault(require("./auth"));

var _user = _interopRequireDefault(require("./user"));

var _report = _interopRequireDefault(require("./report"));

var _major = _interopRequireDefault(require("./major"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  universityController: _university.default,
  scoreController: _score.default,
  authController: _auth.default,
  userController: _user.default,
  reportController: _report.default,
  majorController: _major.default
};