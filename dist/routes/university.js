"use strict";

var _controllers = require("../controllers");

var express = require('express');

var router = express.Router();
router.get('/', function (req, res) {
  _controllers.universityController.findList(req, res);
});
router.post('/', (req, res) => {
  _controllers.universityController.createUniversity(req, res);
});
router.patch('/:id', (req, res) => {
  _controllers.universityController.updateUniversity(req, res);
});
router.delete('/:id', (req, res) => {
  _controllers.universityController.deleteUniversity(req, res);
});
module.exports = router;