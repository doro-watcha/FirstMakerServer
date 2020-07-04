"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = require("../services");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _functions = require("../utils/functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class majorController {
  static async create(req, res) {
    try {
      const result = await _joi.default.validate(req.body, {
        amount: _joi.default.number().required(),
        userId: _joi.default.number().required(),
        predictTimes: _joi.default.number().required()
      });
      const {
        amount,
        userId,
        predictTimes
      } = result;
      const modelObj = {
        amount,
        userId,
        predictTimes
      };
      const paymentRecord = await _services.paymentRecordService.create(modelObj);
      const response = {
        success: true,
        data: {
          paymentRecord
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async findOne(req, res) {
    try {
      const id = req.params.id;
      const paymentRecord = await _services.paymentRecordService.findOne(id);
      const response = {
        success: true,
        data: {
          paymentRecord
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async findList(req, res) {
    try {
      const {
        user
      } = req;
      const paymentRecord = await _services.paymentRecordService.findList(user.id);
      const response = {
        success: true,
        data: {
          paymentRecord
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async update(req, res) {
    try {
      const id = req.params.id;
      const result = await _joi.default.validate(req.body, {
        amount: _joi.default.number(),
        userId: _joi.default.number(),
        predictTimes: _joi.default.number()
      });
      const {
        amount,
        userId,
        predictTimes
      } = result;
      const modelObj = {
        amount,
        userId,
        predictTimes
      };
      const paymentRecord = await _services.paymentRecordService.update(id, modelObj);
      const response = {
        success: true,
        data: {
          paymentRecord
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async delete(req, res) {
    try {
      const id = req.params.id;
      await _services.paymentRecordService.delete(id);
      const response = {
        success: true
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

}

exports.default = majorController;