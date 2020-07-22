"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = require("../services");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _mime = _interopRequireDefault(require("mime"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _functions = require("../utils/functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class majorController {
  static async create(req, res) {
    try {
      const result = await _joi.default.validate(req.body, {
        line: _joi.default.string().required(),
        group: _joi.default.string().required(),
        location: _joi.default.string().required(),
        recruitmentType: _joi.default.string().required(),
        univName: _joi.default.string().required(),
        recruitmentUnit: _joi.default.string().required(),
        majorName: _joi.default.string().required()
      });
      const {
        line,
        group,
        location,
        recruitmentType,
        univName,
        recruitmentUnit,
        majorName
      } = result;
      const modelObj = {
        line,
        group,
        location,
        recruitmentType,
        univName,
        recruitmentUnit,
        majorName
      };
      const major = await _services.majorService.create(modelObj);
      const response = {
        success: true,
        data: {
          major
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async findList(req, res) {
    try {
      const result = await _joi.default.validate(req.query, {
        line: _joi.default.string(),
        group: _joi.default.string(),
        location: _joi.default.string(),
        recruitmentType: _joi.default.string(),
        univName: _joi.default.string(),
        recruitmentUnit: _joi.default.string(),
        majorName: _joi.default.string()
      });
      const {
        line,
        group,
        location,
        recruitmentType,
        univName,
        recruitmentUnit,
        majorName
      } = result;
      const modelObj = {
        line,
        group,
        location,
        recruitmentType,
        univName,
        recruitmentUnit,
        majorName
      };
      const majors = await _services.majorService.findList(modelObj);
      const response = {
        success: true,
        data: {
          majors
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
      const major = await _services.majorService.findOne({
        id
      });
      const response = {
        success: true,
        data: {
          major
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
        line: _joi.default.string(),
        group: _joi.default.string(),
        location: _joi.default.string(),
        recruitmentType: _joi.default.string(),
        univName: _joi.default.string(),
        recruitmentUnit: _joi.default.string(),
        majorName: _joi.default.string()
      });
      const {
        line,
        group,
        location,
        recruitmentType,
        univName,
        recruitmentUnit,
        majorName
      } = result;
      const modelObj = {
        line,
        group,
        location,
        recruitmentType,
        univName,
        recruitmentUnit,
        majorName
      };
      const major = await _services.majorService.update(id, modelObj);
      const response = {
        success: true,
        data: {
          major
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
      await _services.majorService.delete(id);
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