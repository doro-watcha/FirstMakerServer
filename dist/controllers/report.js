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
  static async create(req, res) {
    try {
      const {
        user
      } = req;
      const result = await _joi.default.validate(req.body, {
        score: _joi.default.number(),
        majorDataId: _joi.default.number()
      });
      const {
        score,
        majorDataId
      } = result;
      const modelObj = {
        score,
        majorDataId,
        userId: user.id
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

  static async findOne(req, res) {
    try {
      const id = req.params.id;
      const report = await _services.reportService.findOne({
        id
      });
      if (report == null) throw Error('REPORT_NOT_FOUND');
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
      const {
        user
      } = req;
      const reports = await _services.reportService.findList(user.id);
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

  static async update(req, res) {
    try {
      const id = req.params.id;
      const result = await _joi.default.validate(req.body, {
        score: _joi.default.number(),
        majorDataId: _joi.default.number(),
        userId: _joi.default.number()
      });
      const {
        score,
        majorDataId,
        userId
      } = result;
      const modelObj = {
        score,
        majorDataId,
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

  static async delete(req, res) {
    try {
      const id = req.params.id;
      await _services.reportService.delete(id);
      const response = {
        success: true
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

}

exports.default = reportController;