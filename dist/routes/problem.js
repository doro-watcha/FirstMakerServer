"use strict";

var _controllers = require("../controllers");

var express = require('express');

var router = express.Router();
router.post('/', (req, res) => {
  _controllers.problemController.create(req, res);
});
router.get('/', (req, res) => {
  _controllers.problemController.findList(req, res);
});
module.exports = router;