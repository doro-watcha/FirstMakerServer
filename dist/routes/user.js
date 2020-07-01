"use strict";

var _controllers = require("../controllers");

var express = require('express');

var router = express.Router();
router.get('/:id', (req, res) => {
  _controllers.userController.findUser(req, res);
});
router.patch('/:id', (req, res) => {
  _controllers.userController.updateUser(req, res);
});
router.delete('/:id', (req, res) => {
  _controllers.userController.deleteUser(req, res);
});
module.exports = router;