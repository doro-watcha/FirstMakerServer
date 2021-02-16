"use strict";

var _express = require("express");

var _controllers = require("../controllers");

var router = new _express.Router();
router.post('/', (req, res) => {
  _controllers.sourceController.create(req, res);
});
router.get('/', (req, res) => {
  _controllers.sourceController.listSources(req, res);
});
module.exports = router;