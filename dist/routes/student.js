"use strict";

var _express = require("express");

var _controllers = require("../controllers");

var router = new _express.Router();
router.post('/', (req, res) => {
  _controllers.studentController.create(req, res);
});
router.get('/', (req, res) => {
  _controllers.studentController.findList(req, res);
});
router.get('/:id', (req, res) => {
  _controllers.studentController.findOne(req, res);
});
module.exports = router;