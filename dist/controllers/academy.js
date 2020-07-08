"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = require("../services");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _functions = require("../utils/functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class academyController {
  static async create(req, res) {
    try {
      const result = await _joi.default.validate(req.body, {
        name: _joi.default.string().required(),
        password: _joi.default.string().required()
      });
      const {
        name,
        password
      } = result;
      const modelObj = {
        name,
        password
      }; // check if user already exists

      const academy = await _services.academyService.findOne({
        name
      }); // [ERROR] USER_ALREADY_EXISTS

      if (academy) throw Error('ACADEMY_ALREADY_EXISTS'); // create user

      const success = await _services.academyService.create(modelObj); // create response

      const response = {
        success: success
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async findAll(req, res) {
    try {
      const academy = await _services.academyService.findAll({});
      const response = {
        success: true,
        data: {
          academy
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
      const academy = await _services.academyService.findOne({
        id
      });
      if (academy == null) throw Error('ACADEMY_NOT_FOUND');
      const response = {
        success: true,
        data: {
          academy
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
        name: _joi.default.string()
      });
      const {
        name
      } = result;
      const modelObj = {
        name
      };
      const academy = await _services.academyService.update(id, modelObj);
      const response = {
        success: true,
        data: {
          academy
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
      await _services.academyService.delete(id);
      const response = {
        success: true
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

}

exports.default = academyController;