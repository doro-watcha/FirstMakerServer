"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _models = require("../models");

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let instance = null;
const Op = _sequelize.default.Op;

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
    await _models.User.create(user);

    const newUser = _models.User.findOne({
      where: {
        email: user.email
      }
    });

    if (newUser == null) throw Error('USER_NOT_FOUND');else {
      return newUser;
    }
  }

  async findOne(where) {
    return await _models.User.findOne({
      where: JSON.parse(JSON.stringify(where)),
      include: [{
        model: _models.Teacher,
        as: 'teacher'
      }, {
        model: _models.Student,
        as: 'student'
      }]
    });
  }

  async findList(where) {
    return await _models.User.findAll({
      where: JSON.parse(JSON.stringify(where))
    });
  }

  async update(id, user) {
    await _models.User.update(user, {
      where: {
        id
      }
    });
    const updatedUser = await _models.User.findOne({
      where: {
        id
      }
    });
    if (updatedUser === null) throw Error('USER_NOT_FOUND');
    return updatedUser;
  }

  async delete(id) {
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

  async findUserByStudentName(studentName) {
    return await _models.User.findAll({
      where: {
        name: {
          [Op.like]: "%" + studentName + "%"
        },
        type: "student"
      },
      include: {
        model: _models.Student,
        as: 'student'
      }
    });
  }

}

var _default = new UserService();

exports.default = _default;