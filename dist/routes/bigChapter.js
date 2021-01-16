"use strict";

var _express = require("express");

var _controllers = require("../controllers");

var router = new _express.Router();
router.post('/', (req, res) => {
  _controllers.bigChapterController.create(req, res);
});
router.get('/', (req, res) => {
  _controllers.bigChapterController.findList(req, res);
});
module.exports = router;