var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var dbconfig = require('../database.js');
var conn = mysql.createConnection(dbconfig);

var app = express();

var router = express.Router();

router.post( '/', function ( req, res) {
  var username = req.body.username;

  var query = conn.query(`SELECT * from FEED WHERE username =`+mysql.escape(username), function ( err, result){
    

  });


});


module.exports = router;
