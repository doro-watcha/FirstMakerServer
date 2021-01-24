"use strict";

var _express = require("express");

var _controllers = require("../controllers");

var router = new _express.Router();
router.post('/', (req, res) => {
  console.log("zxcv");

  _controllers.workBookController.create(req, res);
});
router.post('/buy', (req, res) => {
  _controllers.workBookController.buy(req, res);
});
router.get('/:id', (req, res) => {
  _controllers.workBookController.findOne(req, res);
});
router.get('/:studentId/list', (req, res) => {
  _controllers.workBookController.findMyList(req, res);
});
router.get('/', (req, res) => {
  _controllers.workBookController.findList(req, res);
});
router.get('/myChapter/:studentId/list', (req, res) => {
  _controllers.workBookController.findMyChapterList(req, res);
});
router.patch('/:id', (req, res) => {
  _controllers.workBookController.update(req, res);
});
router.delete('/:id', (req, res) => {
  _controllers.workBookController.delete(req, res);
});
module.exports = router;