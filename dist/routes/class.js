"use strict";

var _express = require("express");

var _controllers = require("../controllers");

var router = new _express.Router();
router.post('/', (req, res) => {
  _controllers.classController.create(req, res);
});
router.get('/', (req, res) => {
  _controllers.classController.findList(req, res);
});
router.get('/:id', (req, res) => {
  _controllers.classController.findOne(req, res);
});
router.get('/:studentId/list', (req, res) => {
  _controllers.classController.findListByStudentId(req, res);
});
router.post('/addStudent', (req, res) => {
  _controllers.classController.addStudent(req, res);
});
router.post('/delete/student', (req, res) => {
  _controllers.classController.deleteStudent(req, res);
});
module.exports = router;