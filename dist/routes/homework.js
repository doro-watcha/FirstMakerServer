"use strict";

var _controllers = require("../controllers");

var express = require('express');

const {
  authenticate
} = Authenticator;
var router = express.Router();
router.post('/', authenticate, (req, res) => {
  _controllers.homeworkController.create(req, res);
});
router.get('/', (req, res) => {
  _controllers.homeworkController.findList(req, res);
});