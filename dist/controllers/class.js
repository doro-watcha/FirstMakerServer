"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = require("../services");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _functions = require("../utils/functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class classController {
  static async create(req, res) {
    try {
      const result = await _joi.default.validate(req.body, {
        name: _joi.default.string().required(),
        studentIdList: _joi.default.array().optional(),
        teacherId: _joi.default.number().required()
      });
      const {
        name,
        studentIdList,
        teacherId
      } = result;
      console.log(name);
      console.log(studentIdList);
      console.log(teacherId);
      const modelObj = {
        name,
        teacherId
      };
      const newClass = await _services.classService.create(modelObj);

      if (studentIdList !== undefined) {
        for (let i = 0; i < studentIdList.length; i++) {
          let classBelongs = {
            studentId: studentIdList[i],
            classId: newClass.id
          };
          await _services.classBelongsService.create(classBelongs);
        }
      }

      const response = {
        success: true
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async findOne(req, res) {
    try {
      const id = req.params.id;
      const classInfo = await _services.classService.findOne({
        id
      });
      if (classInfo == null) throw Error('CLASS_NOT_FOUND');
      const response = {
        success: true,
        data: {
          class: classInfo
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
        teacherId: _joi.default.number().required()
      });
      const {
        teacherId
      } = result;
      const classes = await _services.classService.findList({
        teacherId
      });
      const response = {
        success: true,
        data: {
          classes
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async addStudent(req, res) {
    try {
      const result = await _joi.default.validate(req.body, {
        studentId: _joi.default.number().required(),
        classId: _joi.default.number().required()
      });
      const {
        studentId,
        classId
      } = result;
      const modelObj = {
        studentId,
        classId
      };
      const alreadyStudent = await _services.classBelongsService.findOneByStudentId(studentId);
      if (alreadyStudent != null) throw Error('STUDENT_ALREADY_EXISTS');
      await _services.classBelongsService.create(modelObj);
      const response = {
        success: true
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async deleteStudent(req, res) {
    try {
      const result = await _joi.default.validate(req.body, {
        studentId: _joi.default.number().required(),
        classId: _joi.default.number().required()
      });
      const {
        studentId,
        classId
      } = result;
      await _services.classBelongsService.delete(studentId, classId);
      const response = {
        success: true
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

}

exports.default = classController;