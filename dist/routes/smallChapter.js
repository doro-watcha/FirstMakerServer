"use strict";

var _controllers = require("../controllers");

var express = require('express');

var router = express.Router();
router.post('/', (req, res) => {
  _controllers.smallChapterController.create(req, res);
});
router.get('/', (req, res) => {
  _controllers.smallChapterController.findList(req, res);
});
router.delete('/:id', (req, res) => {
  _controllers.smallChapterController.delete(req, res);
});
module.exports = router;