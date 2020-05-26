"use strict";

var _controllers = require("../controllers");

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var router = _express.default.Router();

router.get('/', function (req, res) {
  _controllers.scoreController.getScore(req, res);
});
router.post('/', function (req, res) {
  _controllers.scoreController.setScore(req, res);
});
module.exports = router;