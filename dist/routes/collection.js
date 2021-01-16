"use strict";

var _controllers = require("../controllers");

var _Authenticator = _interopRequireDefault(require("../Authenticator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');

const {
  authenticate
} = _Authenticator.default;
var router = express.Router();
router.post('/', authenticate, (req, res) => {
  _controllers.collectionController.create(req, res);
});
router.get('/', authenticate, (req, res) => {
  _controllers.collectionController.findList(req, res);
});
router.get('/:id', (req, res) => {
  _controllers.collectionController.findOne(req, res);
});
router.patch('/:id', (req, res) => {
  _controllers.collectionController.update(req, res);
});
router.delete('/:id', (req, res) => {
  _controllers.collectionController.delete(req, res);
});
module.exports = router;