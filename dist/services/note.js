"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _models = require("../models");

var _crypto = require("crypto");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Op = _sequelize.default.Op;
let instance = null;

class NoteService {
  constructor() {
    if (!instance) {
      console.log('NoteService 생성' + this);
      instance = this;
    }

    return instance;
  }

  async create(modelObj) {
    await _models.Note.create(modelObj);
    const newNote = await _models.Note.findOne({
      where: JSON.parse(JSON.stringify(modelObj))
    });
    return newNote;
  }

  async findOne(where) {
    return await _models.Note.findOne({
      where: JSON.parse(JSON.stringify(where)),
      include: {
        model: _models.Problem,
        as: 'problem',
        include: [{
          model: _models.BigChapter,
          as: 'bigChapter'
        }, {
          model: _models.MiddleChapter,
          as: 'middleChapter'
        }, {
          model: _models.SmallChapter,
          as: 'smallChapter'
        }]
      }
    });
  }

  async findWeeklyList(userId, startDate, endDate) {
    return await _models.Note.findAll({
      where: {
        userId,
        updatedAt: {
          [Op.lt]: endDate,
          [Op.gt]: startDate
        }
      }
    });
  }

  async findList(where) {
    return await _models.Note.findAll({
      where: JSON.parse(JSON.stringify(where)),
      include: {
        model: _models.Problem,
        as: 'problem',
        include: [{
          model: _models.BigChapter,
          as: 'bigChapter'
        }, {
          model: _models.MiddleChapter,
          as: 'middleChapter'
        }, {
          model: _models.SmallChapter,
          as: 'smallChapter'
        }, {
          model: _models.Subject,
          as: 'subject'
        }]
      }
    });
  }

  async update(id, note) {
    await _models.Note.update(note, {
      where: {
        id
      }
    });
    const updatedNote = await _models.Note.findOne({
      where: {
        id
      },
      include: {
        model: _models.Problem,
        as: 'problem',
        include: [{
          model: _models.BigChapter,
          as: 'bigChapter'
        }, {
          model: _models.MiddleChapter,
          as: 'middleChapter'
        }, {
          model: _models.SmallChapter,
          as: 'smallChapter'
        }]
      }
    });
    if (updatedNote === null) throw Error('NOTE_NOT_FOUND');
    return updatedNote;
  }

  async findLongList(userId, startDate, endDate) {
    return await _models.Note.findAll({
      where: {
        userId,
        spendingTime: {
          [Op.gte]: 3000
        },
        updatedAt: {
          [Op.lt]: endDate,
          [Op.gt]: startDate
        }
      },
      include: {
        model: _models.Problem,
        as: 'problem',
        include: [{
          model: _models.BigChapter,
          as: 'bigChapter'
        }, {
          model: _models.MiddleChapter,
          as: 'middleChapter'
        }, {
          model: _models.SmallChapter,
          as: 'smallChapter'
        }, {
          model: _models.Subject,
          as: 'subject'
        }]
      }
    });
  }

  async findWrongList(userId, startDate, endDate) {
    return await _models.Note.findAll({
      where: {
        userId,
        status: "틀림",
        updatedAt: {
          [Op.lt]: endDate,
          [Op.gt]: startDate
        }
      },
      include: {
        model: _models.Problem,
        as: 'problem',
        include: [{
          model: _models.BigChapter,
          as: 'bigChapter'
        }, {
          model: _models.MiddleChapter,
          as: 'middleChapter'
        }, {
          model: _models.SmallChapter,
          as: 'smallChapter'
        }, {
          model: _models.Subject,
          as: 'subject'
        }]
      }
    });
  }

  async findStarList(userId, startDate, endDate) {
    return await _models.Note.findAll({
      where: {
        userId,
        isGreenStar: 1,
        updatedAt: {
          [Op.lt]: endDate,
          [Op.gt]: startDate
        }
      },
      include: {
        model: _models.Problem,
        as: 'problem',
        include: [{
          model: _models.BigChapter,
          as: 'bigChapter'
        }, {
          model: _models.MiddleChapter,
          as: 'middleChapter'
        }, {
          model: _models.SmallChapter,
          as: 'smallChapter'
        }, {
          model: _models.Subject,
          as: 'subject'
        }]
      }
    });
  }

}

var _default = new NoteService();

exports.default = _default;