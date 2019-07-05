var express = require('express');
var app = express();

var router = express.Router();

router.post('/', function(req, res) {
  var password = req.body.password;
  var password_validation = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(password);

  var register_json = {
    "passwordValidation" : password_validation
  };
  res.json(register_json);
});

module.exports = router;
