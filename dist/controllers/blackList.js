"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = require("../services");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _functions = require("../utils/functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class blackListController {
  static async create(req, res) {
    try {
      const result = await _joi.default.validate(req.body, {
        teacherId: _joi.default.number().required(),
        problemId: _joi.default.number().required()
      });
      const {
        teacherId,
        problemId
      } = result;
      const modelObj = {
        problemId,
        teacherId
      };
      await _services.blackListService.create(modelObj);
      const response = {
        success: true
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async findList(req, res) {
    try {
      const result = await _joi.default.validate(req.body, {
        teacherId: _joi.default.number().required()
      });
      const {
        teacherId
      } = result;
      const blackList = await _services.blackListService.findList({
        teacherId
      });
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

}

exports.default = blackListController;