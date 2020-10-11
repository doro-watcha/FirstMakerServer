"use strict";

var _controllers = require("../controllers");

var express = require('express');

var router = express.Router();
router.post('/', (req, res) => {
  _controllers.bigChapterController.create(req, res);
});
router.get('/', (req, res) => {
  _controllers.bigChapterController.findList(req, res);
});
module.exports = router;