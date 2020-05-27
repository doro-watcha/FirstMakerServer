"use strict";

var mysql = require('mysql');

var express = require('express');

var bodyParser = require('body-parser');

var dbconfig = require('../database.js');

var conn = mysql.createConnection(dbconfig);

var {
  universityController
} = require('../../controllers');

var app = express();
var router = express.Router();
router.post('/get', function (req, res) {
  var accountId = req.body.id;
  var query = conn.query(`SELECT subject,type, score, grade, percentile FROM score WHERE accountId=` + mysql.escape(accountId), function (err, result) {
    console.log(result);
    res.send(result);
  });
});
router.post('/set', function (req, res) {
  req.body.array.forEach(element => {
    console.log(element);
  });
});
router.post('/graph', function (req, res) {
  console.log("fuck");
  var korean = req.body.korean;
  var math = req.body.math;
  var english = req.body.english;
  var history = req.body.history;
  var tamgu1 = req.body.tamgu1;
  var tamgu2 = req.body.tamgu2;
  var new_korean = parseInt(korean.score * 357.1 / 200);
  var new_math = parseInt(math.score * 357.1 / 200);
  var new_tamgu = parseInt((tamgu1.score + tamgu2.score) * 285.7 / 200);
  var new_english = english.grade * 2 - 3;
  var new_history = 0;
  if (history.grade < 4) new_history = 10;else if (history.grade > 3 && history.grade < 8) {
    new_history = 10 - 0.2 * (history.grade - 3);
  } else new_history = 9;
  console.log(new_korean);
  console.log(new_math);
  var total = new_korean + new_math + new_tamgu - new_english + new_history;
  var object = {
    "total": total,
    "success": true
  };
  res.send(object);
});
router.post('/list', function (req, res) {
  var type = req.body.type;
  var query = conn.query(`SELECT major,name from university WHERE type=` + mysql.escape(type), function (err, result) {
    var new_result = result.filter;
    console.log(err);
    console.log(result);
    var object = {
      "list": result,
      "success": true
    };
    res.send(object);
  });
});
router.post('/predict', function (req, res) {
  console.log(req.body);
  var name = req.body.name;
  var major = req.body.major;
  var type = req.body.type;
  var query = conn.query(`SELECT strong_val , safe_val, dangerous_val, sniping_val FROM university WHERE name=` + mysql.escape(name) + `AND major=` + mysql.escape(major) + `AND type=` + mysql.escape(type), function (err, result) {
    console.log(result);
    var object = {
      "value": result,
      "success": true
    };
    res.send(object);
  });
});
router.post('/get', function (req, res) {
  console.log("good");
  universityController.predict(req, res);
});
module.exports = router;