"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = require("../services");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _functions = require("../utils/functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class reflectionRatioController {
  static async create(req, res) {
    try {
      const result = await _joi.default.validate(req.body, {
        metadata: _joi.default.object().required(),
        ratio: _joi.default.object().required(),
        description: _joi.default.object().required(),
        minGrade: _joi.default.object().required(),
        extraRatio: _joi.default.object().required(),
        perfectScore: _joi.default.object().required(),
        totalScore: _joi.default.number().required(),
        gradeToScore: _joi.default.object().required(),
        univId: _joi.default.number().required()
      });
      /* meta data = { applicationIndicator, reflectionSubject, reflectionNumber , applyingNumber }
       */

      const {
        metadata,
        ratio,
        description,
        minGrade,
        extraRatio,
        perfectScore,
        totalScore,
        gradeToScore,
        univId
      } = result;
      const modelObj = {
        metadata,
        ratio,
        description,
        minGrade,
        extraRatio,
        perfectScore,
        totalScore,
        gradeToScore,
        univId
      };
      const reflectionRatio = await _services.reflectionRatioService.create(modelObj);
      const response = {
        success: true,
        data: {
          reflectionRatio
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
      const reflectionRatio = await _services.reflectionRatioService.findOne(id);
      const response = {
        success: true,
        data: {
          reflectionRatio
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async findByUnivId(req, res) {
    try {
      const result = await _joi.default.validate(req.query, {
        univId: _joi.default.number().required()
      });
      const {
        univId
      } = result;
      const reflectionRatio = await _services.reflectionRatioService.findByUnivId(univId);
      const response = {
        success: true,
        data: {
          reflectionRatio
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
        metadata: _joi.default.object().required(),
        ratio: _joi.default.object().required(),
        description: _joi.default.object().required(),
        minGrade: _joi.default.object().required(),
        extraRatio: _joi.default.object().required(),
        perfectScore: _joi.default.object().required(),
        totalScore: _joi.default.number().required(),
        gradeToScore: _joi.default.object().required(),
        univId: _joi.default.number().required()
      });
      /* meta data = { applicationIndicator, reflectionSubject, reflectionNumber , applyingNumber }
       */

      const {
        metadata,
        ratio,
        description,
        minGrade,
        extraRatio,
        perfectScore,
        totalScore,
        gradeToScore,
        univId
      } = result;
      const modelObj = {
        metadata,
        ratio,
        description,
        minGrade,
        extraRatio,
        perfectScore,
        totalScore,
        gradeToScore,
        univId
      };
      const reflectionRatio = await _services.reflectionRatioService.update(id, modelObj);
      const response = {
        success: true,
        data: {
          reflectionRatio
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
      await _services.reflectionRatioService.delete(id);
      const response = {
        success: true
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

}

exports.default = reflectionRatioController;