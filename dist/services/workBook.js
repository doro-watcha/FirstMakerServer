"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _models = require("../models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let instance = null;

class WorkBookService {
  constructor() {
    if (!instance) {
      console.log('WorkBook Service 생성' + this);
      instance = this;
    }

    return instance;
  }

  async create(modelObj) {
    await _models.WorkBook.create(modelObj);
    return true;
  }

  async buy(studentId, workBookId) {
    const student = await _models.Student.findOne({
      where: {
        id: studentId
      }
    });
    if (student == null) throw Error('STUDENT_NOT_FOUND');
    const workBook = await _models.WorkBook.findOne({
      where: {
        id: workBookId
      }
    });
    if (workBook == null) throw Error('WORK_BOOK_NOT_FOUND');
    workBook.addStudent(student, {
      through: {}
    });
    return true;
  }

  async findAll() {
    return await _models.WorkBook.findAll({
      where: {}
    });
  }

  async findOne(where) {
    return await _models.WorkBook.findOne({
      where: JSON.parse(JSON.stringify(where)),
      include: [{
        model: _models.Subject,
        as: 'subject',
        include: {
          model: _models.BigChapter,
          as: 'bigChapter'
        }
      }]
    });
  }

  async delete(id) {
    const WorkBook = await WorkBook.findOne({
      where: id
    });

    if (WorkBook == null) {
      throw Error('WORK_BOOK_NOT_FOUND');
    } else {
      await WorkBook.destroy();
    }
  }

}

var _default = new WorkBookService();

exports.default = _default;