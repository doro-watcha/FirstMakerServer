"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _axios = _interopRequireDefault(require("axios"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _functions = require("../utils/functions");

var _variables = require("../utils/variables");

var _services = require("../services");

var _Teacher = _interopRequireDefault(require("../models/Teacher"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

// aws s3
const s3 = new _awsSdk.default.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  Bucket: process.env.S3_BUCKET_NAME
});

class AuthController {
  static async token(req, res) {
    try {
      // user info from middlewawre: Authenticator.authenticate
      const {
        user
      } = req; // get user info

      const foundUser = await _services.userService.findOne({
        id: user.id
      }); // create response

      const response = {
        success: true,
        data: {
          user: foundUser
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async signUp(req, res) {
    try {
      // validation
      const result = await _joi.default.validate(req.body, {
        email: _joi.default.string().required(),
        password: _joi.default.string().required(),
        name: _joi.default.string().required(),
        school: _joi.default.string().optional(),
        grade: _joi.default.string().optional(),
        mathGrade: _joi.default.number().optional(),
        type: _joi.default.string().optional(),
        teacherCode: _joi.default.string().optional()
      });
      const {
        email,
        password,
        school,
        grade,
        mathGrade,
        type,
        teacherCode,
        name
      } = result;
      if (teacherCode !== undefined && type == "teacher" && teacherCode !== "34526555") throw Error('WRONG_TEACHER_CODE');
      console.log(type); // check if user already exists

      const alreadyUser = await _services.userService.findOne({
        email
      }); // [ERROR] USER_ALREADY_EXISTS

      if (alreadyUser) throw Error('USER_ALREADY_EXISTS'); // create user

      const user = await _services.userService.create({
        email,
        password,
        type,
        name
      });
      console.log(user.id);

      if (type == "student") {
        const student = {
          school,
          grade,
          mathGrade,
          userId: user.id,
          name
        };
        await _services.studentService.create(student);
      } else if (type == "teacher") {
        const teacher = {
          subject: "math",
          userId: user.id,
          name
        };
        await _services.teacherService.create(teacher);
      } // create response


      const response = {
        success: true
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async signIn(req, res) {
    try {
      const result = await _joi.default.validate(req.body, {
        email: _joi.default.string().required(),
        password: _joi.default.string().regex(_variables.passwordRegex).required()
      });
      const {
        email,
        password
      } = result; // get user info

      let user = await _services.userService.findOne({
        email
      }); // [ERROR] USER_NOT_FOUND

      if (!user) throw Error('USER_NOT_FOUND'); // [ERROR] PASSWORD_MISMATCH

      if (!user.isValidPassword(password)) throw Error('PASSWORD_MISMATCH'); // issue token

      const token = _jsonwebtoken.default.sign({
        id: user.id,
        email: user.email
      }, 'token-secret-staging', {
        expiresIn: '60 days'
      }); // create response


      const response = {
        success: true,
        data: {
          token,
          user
        }
      };
      res.send(response);
    } catch (e) {
      console.log(e);
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

}

exports.default = AuthController;