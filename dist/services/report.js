"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../models");

let instance = null;

class ReportService {
  constructor() {
    if (!instance) {
      console.log('Report Service 생성' + this);
      instance = this;
    }

    return instance;
  }

  async create(modelObj) {
    const {
      userId,
      majorId
    } = modelObj;
    const user = await _models.User.findOne({
      where: {
        id: userId
      }
    });
    if (user == null) throw Error('USER_NOT_FOUND');
    const major = await _models.Major.findOne({
      where: {
        id: majorId
      }
    });
    if (major == null) throw Error('MAJOR_NOT_FOUND');
    return await _models.Report.create(modelObj);
  }

  async findOne(id) {
    return await _models.Report.findOne({
      where: {
        id
      }
    });
  }

  async findAll(userId) {
    let options = {
      where: {
        userId
      },
      attributes: ['id', 'score'],
      include: [{
        model: _models.Major,
        as: 'major'
      }, {
        model: _models.User,
        as: 'user'
      }]
    };
    return await _models.Report.findAll(options);
  }

  async update(id, report) {
    await _models.Report.update(report, {
      where: {
        id
      }
    });
    const updateReport = await _models.Report.findOne({
      where: {
        id
      }
    });
    if (updateReport === null) throw Error('REPORT_NOT_FOUND');
    return updateReport;
  }

  async delete(id) {
    const report = await _models.Report.findOne({
      where: {
        id
      }
    });

    if (report == null) {
      throw Error('REPORT_NOT_FOUND');
    } else {
      await report.destroy();
    }
  }

}

var _default = new ReportService();

exports.default = _default;