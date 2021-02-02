"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = require("../services");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _functions = require("../utils/functions");

var _Note = _interopRequireDefault(require("../models/Note"));

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Op = _sequelize.default.Op;

class noteController {
  static async create(req, res) {
    try {
      const result = await _joi.default.validate(req.body, {
        collectionId: _joi.default.numbeer().required(),
        problemId: _joi.default.number().required()
      });
      const {
        collectionId,
        problemId
      } = result;
      const modelObj = {
        problemId,
        collectionId
      };
      const newNote = await _services.noteService.create(modelObj);
      const response = {
        success: true,
        data: {
          note: newNote
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
        startDate: _joi.default.string().optional(),
        endDate: _joi.default.string().optional()
      });
      const {
        startDate,
        endDate
      } = result;
      var notes = [];
      const {
        user
      } = req;
      const student = await _services.studentService.findOne({
        userId: user.id
      });
      if (student == null) throw Error('STUDENT_NOT_FOUND');

      if (startDate !== undefined) {
        notes = await _services.noteService.findWeeklyList(student.id, startDate, endDate);
        console.log(notes.map(it => it.status));
        notes = notes.filter(note => note.status === "맞음" || note.status === "틀림");
        console.log(notes.length);
      } else notes = await _services.noteService.findList({
        studentId: student.id
      });

      const response = {
        success: true,
        data: {
          notes
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
      const note = await _services.noteService.findOne({
        id
      });
      if (note == null) throw Error('NOTE_NOT_FOUND');
      const response = {
        success: true,
        data: {
          note
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async update(req, res) {
    try {
      const result = await _joi.default.validate(req.body, {
        submitList: _joi.default.array().required(),
        noteIdList: _joi.default.array().required(),
        spendingTimeList: _joi.default.array().required(),
        greenStarClickedList: _joi.default.array().required(),
        wholeTime: _joi.default.number().required(),
        type: _joi.default.string().required(),
        id: _joi.default.number().required()
      });
      const {
        submitList,
        noteIdList,
        spendingTimeList,
        greenStarClickedList,
        type,
        id,
        wholeTime
      } = result;
      if (submitList.length !== noteIdList.length) throw Error('SCORING_NOT_FOUND');
      var notes = [];
      var correct = 0;

      for (let i = 0; i < submitList.length; i++) {
        const note = await _services.noteService.findOne({
          id: noteIdList[i]
        });
        var status = "틀림";
        var unConfirmed = 0;
        console.log('submitList[i]');
        console.log(submitList[i]);

        if (submitList[i] == note.problem.answer) {
          status = "맞음";
          correct++;
        } else if (submitList[i] == "0" && type != "시험") {
          unConfirmed++;
          status = "채점안됨";
        }

        const _newNote = {
          status,
          submit: submitList[i],
          spendingTime: spendingTimeList[i],
          isGreenStar: greenStarClickedList[i]
        };
        const newNote = await _services.noteService.update(note.id, _newNote);
        notes.push(newNote);
      }

      var collectionStatus = "완료";
      console.log("채점안됨갯수");
      console.log(unConfirmed);
      console.log("type");
      console.log(type);
      if (unConfirmed > 0 && type != "시험") collectionStatus = "진행중";
      const accurateRate = (correct / notes.length * 100).toFixed(2);
      const collectionModel = {
        status: collectionStatus,
        accurateRate,
        spendingTime: wholeTime
      };
      if (type === "숙제") await _services.homeworkService.update(id, collectionModel);else if (type == "시험") await _services.examService.update(id, collectionModel);else if (type == "문제지") await _services.workPaperService.update(id, collectionModel);
      const response = {
        success: true,
        data: {
          notes,
          status: collectionStatus,
          accurateRate,
          spendingTime: wholeTime
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async findWrongList(req, res) {
    try {
      const result = await _joi.default.validate(req.query, {
        subject: _joi.default.string().required(),
        startDate: _joi.default.string().required(),
        endDate: _joi.default.string().required()
      });
      const {
        subject,
        startDate,
        endDate
      } = result;
      const {
        user
      } = req;
      const student = await _services.studentService.findOne({
        userId: user.id
      });
      if (student == null) throw Error('STUDENT_NOT_FOUND');
      const wrongNotes = await _services.noteService.findWrongList(student.id, startDate, endDate);
      wrongNotes.filter(note => {
        if (note.problem.subject != null) note.problem.subject.name == subject;
      });
      const response = {
        success: true,
        data: {
          notes: wrongNotes
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async findStarList(req, res) {
    try {
      const result = await _joi.default.validate(req.query, {
        subject: _joi.default.string().required(),
        startDate: _joi.default.string().required(),
        endDate: _joi.default.string().required()
      });
      const {
        subject,
        startDate,
        endDate
      } = result;
      const {
        user
      } = req;
      const student = await _services.studentService.findOne({
        userId: user.id
      });
      if (student == null) throw Error('STUDENT_NOT_FOUND');
      const starNotes = await _services.noteService.findStarList(student.id, startDate, endDate);
      starNotes.filter(note => {
        if (note.problem.subject != null) note.problem.subject.name == subject;
      });
      const response = {
        success: true,
        data: {
          notes: starNotes
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async findLongList(req, res) {
    try {
      const result = await _joi.default.validate(req.query, {
        subject: _joi.default.string().required(),
        startDate: _joi.default.string().required(),
        endDate: _joi.default.string().required()
      });
      const {
        subject,
        startDate,
        endDate
      } = result;
      const {
        user
      } = req;
      const student = await _services.studentService.findOne({
        userId: user.id
      });
      if (student == null) throw Error('STUDENT_NOT_FOUND');
      const longNotes = await _services.noteService.findLongList(student.id, startDate, endDate);
      longNotes.filter(note => {
        if (note.problem.subject != null) note.problem.subject.name == subject;
      });
      const response = {
        success: true,
        data: {
          notes: longNotes
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

}

exports.default = noteController;