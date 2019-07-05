var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var dbconfig = require('../database.js');
var conn = mysql.createConnection(dbconfig);

var app = express();

var router = express.Router();

router.post('/', function(req, res) {
  var username = req.body.username;

  var profile_edit_request_set = {
    "lastname" : req.body.lastname,
    "firstname" : req.body.firstname,
    "bio" : req.body.bio,
    "email" : req.body.email,
    "phone" : req.body.phone,
    "profile" : req.body.userProfile,
    "background" : req.body.profileBackground
  };
  var query = conn.query(`UPDATE USER SET ? WHERE username =`+mysql.escape(username),profile_edit_request_set, function(err, result){
    if ( err) throw err;
  });

});

module.exports =router;
