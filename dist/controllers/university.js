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
  static async create(req, res) {
    try {
      /**
       * type은 필터 조건인데 location 이라고 하면 지역별, 
       */
      const result = await _joi.default.validate(req.body, {
        name: _joi.default.string(),
        min: _joi.default.number(),
        max: _joi.default.number(),
        line: _joi.default.string(),
        location: _joi.default.string(),
        group: _joi.default.string(),
        type: _joi.default.string()
      });
      const {
        name,
        min,
        max,
        location,
        group,
        line,
        type
      } = result;
      const exist_university = await _services.universityService.findOne({
        name
      });
      if (exist_university != null) throw Error('UNIVERSITY_ALREADY_EXISTS');
      const modelObj = {
        name,
        min,
        max,
        location,
        group,
        line,
        type
      };
      const university = await _services.universityService.create(modelObj);
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

  static async findList(req, res) {
    try {
      const result = await _joi.default.validate(req.query, {
        name: _joi.default.string(),
        min: _joi.default.number(),
        max: _joi.default.number(),
        type: _joi.default.string(),
        location: _joi.default.string(),
        group: _joi.default.string(),
        line: _joi.default.string()
      });
      const {
        name,
        min,
        max,
        location,
        group,
        line,
        type
      } = result;
      const modelObj = {
        name,
        min,
        max,
        type,
        location,
        group,
        line
      };
      const university = await _services.universityService.findList(modelObj);
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

  static async findOne(req, res) {
    try {
      const id = req.params.id;
      const university = await _services.universityService.findOne({
        id
      });
      if (university == null) throw Error('UNIVERSITY_NOT_FOUND');
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

  static async update(req, res) {
    try {
      const id = req.params.id;
      const result = await _joi.default.validate(req.body, {
        name: _joi.default.string(),
        max: _joi.default.number(),
        min: _joi.default.number(),
        location: _joi.default.string(),
        group: _joi.default.string(),
        line: _joi.default.string()
      });
      const {
        name,
        max,
        min,
        location,
        group,
        line
      } = result;
      const modelObj = {
        name,
        max,
        min,
        location,
        group,
        line
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

  static async delete(req, res) {
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