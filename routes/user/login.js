var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var dbconfig = require('../database.js');
var sha256 = require('sha256');
var jwt = require('jsonwebtoken');

var conn = mysql.createConnection(dbconfig);
var salt = "Ch!cken";


/* GET users listing. */
router.post('/', function(req, res) {
  var username = req.body.username;
  var password = sha256( req.body.password + salt );
  
  var login_message="fail";
  var login_token;
  var query = conn.query(`SELECT * FROM USER WHERE username=`+mysql.escape(username), function ( err, result){
    if ( err ) {
      login_message = "login failed";
    }
    else{
      if ( result.length > 0 ) {

        console.log(result[0].password);
        console.log(password);
        if ( result[0].password == password) {
          login_message = "login success";
      


        }
        else {
          login_message = "wrong password";
        }  
      }
      else {
        login_message = "wrong id";
      }
    }
    var login_return_json = {
      "result" : login_message,
    };
    res.json(login_return_json);
  });
});

module.exports = router;
