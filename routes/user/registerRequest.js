var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment-timezone');
var sha256 = require('sha256');
var dbconfig = require('../database.js');
var conn = mysql.createConnection(dbconfig);

var salt = "Ch!cken";
var app = express();

var router = express.Router();
moment.tz.setDefault("Asia/Seoul");

router.post('/', function(req, res) {
  var date = moment().format('YYYY-MM-DD HH:mm:ss');
  console.log(date);  
  var securePassword = sha256(req.body.password + salt);
  var users = { 
    'username' : req.body.username ,
    'password' : securePassword ,
    'USERtime' : date
  };
  var query = conn.query(`INSERT INTO USER SET ?`,users, function ( err, result) {

    res.send( result );
    });
});

module.exports = router;
