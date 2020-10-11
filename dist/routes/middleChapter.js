"use strict";

var _controllers = require("../controllers");

var express = require('express');

var router = express.Router();
router.post('/', (req, res) => {
  _controllers.middleChapterController.create(req, res);
});
router.get('/', (req, res) => {
  _controllers.middleChapterController.findList(req, res);
});
module.exports = router;