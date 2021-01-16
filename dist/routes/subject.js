"use strict";

var _express = _interopRequireDefault(require("express"));

var _controllers = require("../controllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.post('/', (req, res) => {
  _controllers.subjectController.create(req, res);
});
router.get('/', (req, res) => {
  _controllers.subjectController.findList(req, res);
});
module.exports = router;