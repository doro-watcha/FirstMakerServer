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
  static async createMajor(req, res) {
    try {
      const result = await _joi.default.validate(req.body, {
        major: _joi.default.string().required(),
        strong_val: _joi.default.number().required(),
        safe_val: _joi.default.numebr().required(),
        dangerous_val: _joi.default.number().required(),
        sniping_val: _joi.default.number().required(),
        year: _joi.default.number().required(),
        line: _joi.default.string().required(),
        group: _joi.default.string().required()
      });
      const {
        name,
        strong_val,
        safe_val,
        dangerous_val,
        sinping_val,
        year,
        line,
        group
      } = result;
      const modelObj = {
        name: name,
        strong_val: strong_val,
        safe_val: safe_val,
        dangerous_val: dangerous_val,
        sniping_val: sinping_val,
        year: year,
        line: line,
        group: group
      };
      const majorObj = await _services.majorService.create(modelObj);
      const response = {
        success: true,
        data: {
          majorObj
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async findList(req, res) {
    try {
      const univId = req.params.univId;
      const {
        user
      } = req;
      const majors = await _services.majorService.findList(univId, user.line);
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

  static async updateMajor(req, res) {
    try {
      const id = req.params.id;
      const result = await _joi.default.validate(req.body, {
        line: _joi.default.string(),
        group: _joi.default.string(),
        name: _joi.default.string(),
        strong_val: _joi.default.number(),
        safe_val: _joi.default.number(),
        dangerous_val: _joi.default.number(),
        sniping_val: _joi.default.number(),
        year: _joi.default.number(),
        admissionType: _joi.default.string(),
        recruitmentNumber: _joi.default.number(),
        additionalMember: _joi.default.number(),
        competitionNumber: _joi.default.number(),
        isNaesinIncluded: _joi.default.boolean(),
        somethingSpecial: _joi.default.string(),
        etc: _joi.default.string()
      });
      const {
        line,
        group,
        name,
        strong_val,
        safe_val,
        dangerous_val,
        sniping_val,
        year,
        admissionType,
        recruitmentNumber,
        additionalMember,
        competitionNumber,
        isNaesinIncluded,
        somethingSpecial,
        etc
      } = result;
      const finalNumber = recruitmentNumber + additionalMember;
      const modelObj = {
        line: line,
        group: group,
        major: major,
        strong_val: strong_val,
        safe_val: safe_val,
        dangerous_val: dangerous_val,
        sniping_val: sniping_val,
        year: year,
        admissionType: admissionType,
        recruitmentNumber: recruitmentNumber,
        additionalMember: additionalMember,
        finalNumber: finalNumber,
        competitionNumber: competitionNumber,
        isNaesinIncluded: isNaesinIncluded,
        somethingSpecial: somethingSpecial,
        etc: etc
      };
      const majorObj = await _services.majorService.update(id, modelObj);
      const response = {
        success: true,
        data: {
          majorObj
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async deleteMajor(req, res) {
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