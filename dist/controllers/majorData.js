"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = require("../services");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _functions = require("../utils/functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class majorDataController {
  static async create(req, res) {
    try {
      const result = await _joi.default.validate(req.body, {
        year: _joi.default.number().required(),
        majorId: _joi.default.number().required(),
        metadata: _joi.default.object(),
        prediction: _joi.default.object(),
        ratio: _joi.default.object(),
        gradeToScore: _joi.default.object()
      }); // metadata = initialMember , additionalMember , competitionRate, reflectionSubject, tamguNumber , applicationIndicator, extraPoint, somethingSpecial

      const {
        year,
        majorId,
        metadata,
        prediction,
        ratio,
        gradeToScore
      } = result;
      const modelObj = {
        year,
        majorId,
        metadata,
        prediction,
        ratio,
        gradeToScore
      };
      const already_majorData = await _services.majorService.findOne({
        majorId
      });
      if (already_majorData == null) throw Error('MAJOR_NOT_FOUND');
      const majorData = await _services.majorDataService.create(modelObj);
      const response = {
        success: true,
        data: {
          majorData
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
      const majorData = await _services.majorDataService.findOne({
        majorId: id
      });
      const response = {
        success: true,
        data: {
          majorData
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
        year: _joi.default.number(),
        majorId: _joi.default.number()
      }); // metadata = initialMember , additionalMember , competitionRate, reflectionSubject, tamguNumber , applicationIndicator, extraPoint, somethingSpecial

      const {
        year,
        majorId
      } = result;
      const modelObj = {
        year,
        majorId
      };
      const majorData = await _services.majorDataService.findList(modelObj);
      const response = {
        success: true,
        data: {
          majorData
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
        year: _joi.default.number(),
        metadata: _joi.default.object(),
        prediction: _joi.default.object(),
        ratio: _joi.default.object(),
        gradeToScore: _joi.default.object()
      }); // metadata = initialMember , additionalMember , competitionRate, reflectionSubject, tamguNumber , applicationIndicator, additionalPoint, somethingSpecial

      const {
        year,
        metadata,
        prediction,
        ratio,
        gradeToScore
      } = result;
      const modelObj = {
        majorId: id,
        year,
        metadata,
        prediction,
        ratio,
        gradeToScore
      };
      const majorData = await _services.majorDataService.update(id, modelObj);
      const response = {
        success: true,
        data: {
          majorData
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
      await _services.majorDataService.delete(id);
      const response = {
        success: true
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

}

exports.default = majorDataController;