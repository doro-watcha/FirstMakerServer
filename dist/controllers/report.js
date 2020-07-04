"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = require("../services");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _functions = require("../utils/functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class reportController {
  static async createReport(req, res) {
    try {
      const result = await _joi.default.validate(req.body, {
        score: _joi.default.number(),
        majorId: _joi.default.number(),
        userId: _joi.default.number()
      });
      const {
        score,
        majorId,
        userId
      } = result;
      const modelObj = {
        score,
        majorId,
        userId
      };
      const report = await _services.reportService.create(modelObj);
      const response = {
        success: true,
        data: {
          report
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async findReport(req, res) {
    try {
      const id = req.params.id;
      const report = await _services.reportService.findOne(id);
      const response = {
        success: true,
        data: {
          report
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async findList(req, res) {
    try {
      const reports = await _services.reportService.findAll();
      const response = {
        success: true,
        data: {
          reports
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async updateReport(req, res) {
    try {
      const id = req.params.id;
      const result = await _joi.default.validate(req.body, {
        score: _joi.default.number(),
        majorId: _joi.default.number(),
        userId: _joi.default.number()
      });
      const {
        score,
        majorId,
        userId
      } = result;
      const modelObj = {
        score,
        majorId,
        userId
      };
      const updateReport = await _services.reportService.update(id, modelObj);
      const response = {
        success: true,
        data: {
          updateReport
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async deleteReport(req, res) {
    try {} catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

}

exports.default = reportController;