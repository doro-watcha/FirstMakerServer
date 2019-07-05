var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var dbconfig = require('../database.js');
var conn = mysql.createConnection(dbconfig);

var app = express();

var router = express.Router();

router.post('/', function(req, res) {
  var username = req.body.username;
  var query = conn.query(`SELECT * FROM USER WHERE username=`+mysql.escape(username), function(err, result){

    var profile_edit_json = {
      "email" : result[0].email,
      "phone" : result[0].phone
    };
    res.json(profile_edit_json);
    console.log(profile_edit_json);
  });
});

module.exports = router;
