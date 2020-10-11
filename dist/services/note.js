"use strict";

var _sequelize = _interopRequireDefault(require("sequelize"));

var _models = require("../models");

var _crypto = require("crypto");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    return await _models.Note.create(modelObj);
  }

  async findOne(where) {}

  async findList(where) {}

}