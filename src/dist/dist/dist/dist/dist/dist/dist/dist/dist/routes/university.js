"use strict";

var _controllers = require("../controllers");

var mysql = require('mysql');

var express = require('express');

var bodyParser = require('body-parser');

var dbconfig = require('./database.js');

var conn = mysql.createConnection(dbconfig);
var app = express();
var router = express.Router(); // 대학 클릭했을때 밑에 과 주르륵 나오는 api

router.get('/', function (req, res) {
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
}); // 상세결과 눌렀을 때 예측하는 점수 넘겨주는 api

router.post('/predict', function (req, res) {
  _controllers.universityController.predict(req, res);
});
module.exports = router;