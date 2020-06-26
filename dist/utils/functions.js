"use strict";

var _crypto = _interopRequireDefault(require("crypto"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _services = require("../services");

var _variables = require("./variables");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

// create reusable transporter object using the default SMTP transport
const transporter = _nodemailer.default.createTransport({
  host: 'email-smtp.us-east-1.amazonaws.com',
  port: 465,
  secure: true,
  // true for 465, false for other ports
  auth: {
    user: 'AKIA2P2EDJNQDWMSH7CT',
    pass: 'BMGTznZfR+Eu8eOPQEmnoSSbfN+plY6ruX69cr+Efecq'
  }
});

module.exports = {
  createErrorResponse: e => {
    // log error
    console.error(e);

    try {
      // INVALID_REQUEST
      const ecode = e.isJoi ? 102 : _variables.errors[e.message].status ? _variables.errors[e.message].status : 700;
      const message = e.isJoi ? e.details[0].message : _variables.errors[e.message].ko; // error response

      return {
        success: false,
        ecode,
        message
      };
    } catch (e) {
      return {
        success: false,
        ecode: 700,
        message: '서버 오류'
      };
    }
  }
};