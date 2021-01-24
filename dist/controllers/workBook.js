"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = require("../services");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _functions = require("../utils/functions");

var _models = require("../models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class workBookController {
  static async create(req, res) {
    try {
      console.log("123");
      const result = await _joi.default.validate(req.body, {
        title: _joi.default.string().required(),
        publisher: _joi.default.string().required()
      });
      const {
        title,
        publisher
      } = result;
      const modelObj = {
        title,
        publisher
      };
      await _services.workBookService.create(modelObj);
      const response = {
        success: true
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async findList(req, res) {
    try {
      const result = await _joi.default.validate(req.query, {
        studentId: _joi.default.number().optional()
      });
      const {
        studentId
      } = result;
      var workBooks = [];
      if (studentId == undefined) workBooks = await _services.workBookService.findAll();else {
        workBooks = await _services.workBookRecordService.findList({
          studentId
        });
        console.log(workBooks.length);
        workBooks = workBooks.map(workBookRecord => workBookRecord.workBook);
      }
      const response = {
        success: true,
        data: {
          workBooks
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async findMyList(req, res) {
    try {
      const studentId = req.params.studentId;
      var myWorkBooks = await _services.workBookRecordService.findList({
        studentId
      });
      myWorkBooks = myWorkBooks.map(it => it.workBook);
      const response = {
        success: true,
        data: {
          workBooks: myWorkBooks
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async buy(req, res) {
    try {
      const result = await _joi.default.validate(req.body, {
        studentId: _joi.default.number().required(),
        workBookId: _joi.default.number().required(),
        bigChapterId: _joi.default.number().required()
      });
      const {
        studentId,
        workBookId,
        bigChapterId
      } = result;
      const modelObj = {
        studentId,
        workBookId,
        bigChapterId
      };
      await _services.workBookRecordService.create(modelObj);
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
      const workBook = await _services.workBookService.findOne({
        id
      });
      if (workBook == null) throw Error('WORK_BOOK_NOT_FOUND');
      const response = {
        success: true,
        data: {
          workBook
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async findMyChapterList(req, res) {
    try {
      const studentId = req.params.studentId;
      const result = await _joi.default.validate(req.query, {
        subjectId: _joi.default.number().required()
      });
      const {
        subjectId
      } = result;
      var myChapterList = await _services.workBookRecordService.findList({
        subjectId,
        studentId
      });
      console.log(myChapterList.length);
      myChapterList = myChapterList.map(it => it.bigChapter);
      console.log(myChapterList.length);
      const response = {
        success: true,
        data: {
          bigChapters: myChapterList
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

}

exports.default = workBookController;