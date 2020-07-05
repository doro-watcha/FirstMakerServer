"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = require("../services");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _functions = require("../utils/functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UniversityController {
  static async createUniversity(req, res) {
    const result = await _joi.default.validate(req.body, {
      name: _joi.default.string().required(),
      min: _joi.default.number().required(),
      max: _joi.default.number().required(),
      location: _joi.default.string().required(),
      group: _joi.default.string().required()
    });
    const {
      name,
      min,
      max,
      location,
      group
    } = result;
    const modelObj = {
      name,
      min,
      max,
      location,
      group
    };
    const university = await _services.universityService.create(modelObj);
    const response = {
      success: true,
      data: {
        university
      }
    };
    res.send(response);
  }

  static async findList(req, res) {
    try {
      const university = await _services.universityService.findAll();
      if (university == null) throw Error('UNIVERSITY NOT FOUND');
      const response = {
        success: true,
        data: {
          university
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async updateUniversity(req, res) {
    try {
      const id = req.params.id;
      const result = await _joi.default.validate(req.body, {
        name: _joi.default.string(),
        max: _joi.default.number(),
        min: _joi.default.number(),
        location: _joi.default.string(),
        group: _joi.default.string()
      });
      const {
        name,
        max,
        min,
        location,
        group
      } = result;
      const modelObj = {
        name,
        max,
        min,
        location,
        group
      };
      await _services.universityService.update(id, modelObj);
      const response = {
        success: true
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async deleteUniversity(req, res) {
    try {
      const id = req.params.id;
      await _services.universityService.delete(id);
      const response = {
        success: true
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

}

exports.default = UniversityController;