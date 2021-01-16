"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = require("../services");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _functions = require("../utils/functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class collectionController {
  static async create(req, res) {
    try {
      const {
        user
      } = req;
      const result = await _joi.default.validate(req.body, {
        type: _joi.default.number().required(),
        title: _joi.default.string().required(),
        problemIdList: _joi.default.array().required(),
        timeLimit: _joi.default.number().optional()
      });
      const {
        type,
        title,
        problemIdList,
        timeLimit
      } = result;
      const modelObj = {
        type,
        timeLimit,
        title,
        userId: user.id
      };
      const collection = await _services.collectionService.create(modelObj);

      for (let i = 0; i < problemIdList.length; i++) {
        let noteModel = {
          problemId: problemIdList[i],
          collectionId: collection.id
        };
        await _services.noteService.create(noteModel);
      }

      const response = {
        success: true,
        data: {
          collection
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async findOne(req, res) {}

  static async findList(req, res) {
    try {
      const result = await _joi.default.validate(req.query, {
        subjectId: _joi.default.number()
      });
      const {
        subjectId
      } = result;
      const where = {
        subjectId
      };
      const bigChapters = await bigChapterService.findList(where);
      const response = {
        success: true,
        data: {
          bigChapters
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

}

exports.default = collectionController;