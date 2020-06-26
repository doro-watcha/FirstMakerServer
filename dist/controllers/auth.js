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
      } = req;
      console.log("fuck"); // get user info

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
      // // validation
      // const result = await Joi.validate(req.body, {
      // 	userId: Joi.string()
      // 		.required(),
      // 	password: Joi.string()
      // 		.regex(passwordRegex)
      // 		.required()
      // })
      const name = req.body.name;
      const userId = req.body.userId;
      const password = req.body.password; // check if user already exists

      const user = await _services.userService.findOne({
        userId
      }); // [ERROR] USER_ALREADY_EXISTS

      if (user) throw Error('USER_ALREADY_EXISTS'); // create user

      const newUser = await _services.userService.create({
        name: name,
        userId,
        password
      }); // create response

      const response = {
        success: true,
        data: {
          user: newUser
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async signIn(req, res) {
    try {
      // // validation
      // const result = await Joi.validate(req.body, {
      // 	userId: Joi.string()
      // 		.required(),
      // 	password: Joi.string()
      // 		.regex(passwordRegex)
      // 		.required()
      // })
      // const { userId, password } = result
      const userId = req.body.userId;
      const password = req.body.password; // get user info

      let user = await _services.userService.findOne({
        userId
      }); // [ERROR] USER_NOT_FOUND

      if (!user) throw Error('USER_NOT_FOUND'); // [ERROR] PASSWORD_MISMATCH

      if (!user.isValidPassword(password)) throw Error('PASSWORD_MISMATCH'); // issue token

      const token = _jsonwebtoken.default.sign({
        id: user.id,
        userId: user.userId
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