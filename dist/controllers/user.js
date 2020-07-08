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

  static async searchUser(req, res) {
    try {
      const result = await _joi.default.validate(req.query, {
        academyId: _joi.default.number()
      });
      const {
        academyId
      } = result;
      const where = {
        academyId
      };
      const user = await _services.userService.findAll(where);
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
    try {
      const id = req.params.id;
      const result = await _joi.default.validate(req.body, {
        name: _joi.default.string(),
        highSchool: _joi.default.string(),
        line: _joi.default.string(),
        graduateYear: _joi.default.number(),
        predictTimes: _joi.default.number(),
        gender: _joi.default.string()
      });
      const {
        name,
        highSchool,
        line,
        graduateYear,
        gender
      } = result;
      const modelObj = {
        name: name,
        highSchool: highSchool,
        line: line,
        graduateYear: graduateYear,
        gender: gender
      };
      const user = await _services.userService.update(id, modelObj);
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

  static async deleteUser(req, res) {
    try {
      const id = req.params.id;
      await _services.userService.delete(id);
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