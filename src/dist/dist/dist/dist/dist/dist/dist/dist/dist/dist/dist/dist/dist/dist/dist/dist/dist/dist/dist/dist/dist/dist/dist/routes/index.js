"use strict";

var _university = _interopRequireDefault(require("./university"));

var _score = _interopRequireDefault(require("./score"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var express = require('express');

var router = express.Router();
/* GET home page. */

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});
router.use('/university', _university.default);
router.use('/score', _score.default);
module.exports = router;