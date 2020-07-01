"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var _models = require("../models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let instance = null;

class UserService {
  constructor() {
    if (!instance) {
      console.log('UserService 생성' + this);
      instance = this;
    }

    return instance;
  }

  async create(user) {
    // hash password
    if (user.password) user.password = _models.User.hashPassword(user.password);
    return await _models.User.create(user);
  }

  async findById(id) {
    return await _models.User.findByPk(id);
  }

  async findOne(where) {
    return await _models.User.findOne({
      where: JSON.parse(JSON.stringify(where))
    });
  }

  async updateId(id, user) {
    return await _models.User.update(user, {
      where: {
        id
      }
    });
  }

  async deleteById(id) {
    const user = await _models.User.findOne({
      where: {
        id
      }
    });

    if (user == null) {
      throw Error('USER_NOT_FOUND');
    } else {
      await user.destroy();
    }
  }

}

var _default = new UserService();

exports.default = _default;