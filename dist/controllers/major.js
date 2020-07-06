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
      etc: _joi.default.string(),
      univId: _joi.default.number()
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
      etc,
      univId
    } = result;
    const finalNumber = recruitmentNumber + additionalMember;
    const modelObj = {
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
      finalNumber,
      competitionNumber,
      isNaesinIncluded,
      somethingSpecial,
      etc,
      univId
    };
    const exist_major = await _services.majorService.findByName(name, univId);
    if (exist_major != null) throw Error('MAJOR_ALREADY_EXISTS');
    const majorObj = await _services.majorService.create(modelObj);
    const response = {
      success: true,
      data: {
        majorObj
      }
    };
    res.send(response);
  }

  catch(e) {
    res.send((0, _functions.createErrorResponse)(e));
  }

  static async findAll(req, res) {
    try {
      const majors = await _services.majorService.findAll();
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
        etc: _joi.default.string(),
        univId: _joi.default.number()
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
        etc,
        univId
      } = result;
      const finalNumber = recruitmentNumber + additionalMember;
      const modelObj = {
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
        finalNumber,
        competitionNumber,
        isNaesinIncluded,
        somethingSpecial,
        etc,
        univId
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