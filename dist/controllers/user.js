"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = require("../services");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _functions = require("../utils/functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class userController {
  static async findUser(req, res) {
    try {
      const id = req.params.id;
      const user = await _services.userService.findById(id);
      if (user == null) throw Error('USER_NOT_FOUND');
      const response = {
        success: true,
        data: {
          user
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async updateUser(req, res) {
    try {} catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async deleteUser(req, res) {
    try {
      const id = req.params.id;
      await _services.userService.deleteById(id);
      const response = {
        success: true
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

}

exports.default = userController;