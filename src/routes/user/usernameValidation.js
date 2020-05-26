var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var dbconfig = require('../database.js');
var conn = mysql.createConnection(dbconfig);

router.post('/', function(req,res){
  var username = req.body.username;
  var validation = /^[a-zA-Z0-9-_]{4,14}$/.test(username);
  var duplication = true;
  var usernameValidation = conn.query(`SELECT username FROM USER WHERE username = ?` , username, function (err,result) {
    if ( result.length > 0 )  duplication = false;
   
    var usernameValidation_json = {
      "usernameDuplication" : duplication,
      "usernameValidation" : validation };
    res.json(usernameValidation_json);
   });

});

module.exports = router;

