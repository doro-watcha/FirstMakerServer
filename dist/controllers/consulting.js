"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = require("../services");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _functions = require("../utils/functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class consultingController {
  static async createConsulting(req, res) {
    try {
      const result = await _joi.default.validate(req.body, {
        title: _joi.default.string().required(),
        description: _joi.default.string().required(),
        studentId: _joi.default.number()
      });
      const {
        title,
        description,
        studentId
      } = result;
      const modelObj = {
        title,
        description,
        studentId
      };
      const consulting = await _services.consultingService.create(modelObj);
      const response = {
        success: true,
        data: {
          consulting
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async findList(req, res) {
    try {
      const consulting = await _services.consultingService.findAll();
      const response = {
        success: true,
        data: {
          consulting
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
      const consulting = await _services.consultingService.findOne(id);
      const response = {
        success: true,
        data: {
          consulting
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async updateConsulting(req, res) {
    try {
      const id = req.params.id;
      const result = await _joi.default.validate(req, body, {
        title: _joi.default.string().required(),
        description: _joi.default.string().required(),
        studentId: _joi.default.number()
      });
      const {
        title,
        description,
        studentId
      } = result;
      const modelObj = {
        title,
        description,
        studentId
      };
      const consulting = await _services.consultingService.update(id, modelObj);
      const response = {
        success: true,
        data: {
          consulting
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async deleteConsulting(req, res) {
    try {
      const id = req.params.id;
      await _services.consultingService.delete(id);
      const response = {
        success: true
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

}

exports.default = consultingController;