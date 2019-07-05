var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var dbconfig = require('../database.js');
var conn = mysql.createConnection(dbconfig);

var app = express();

var router = express.Router();

router.post('/', function ( req, res ) {
  var username = req.body.username;
  var query = conn.query(`SELECT * FROM USER WHERE username=`+mysql.escape(username), function (err, result){
    console.log(result);
    var profile_json = {
      "lastname" : result[0].lastname,
      "firstname" : result[0].firstname,
      "bio": result[0].bio,
      "fans" : result[0].fan,
      "profile" : result[0].profile,
      "background" : result[0].background
    };
    console.log(profile_json);
    res.json(profile_json);
  });


});

module.exports = router;
