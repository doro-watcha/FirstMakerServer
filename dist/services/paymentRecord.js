"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../models");

let instance = null;

class PaymentRecordService {
  constructor() {
    if (!instance) {
      console.log('PaymentRecord Service 생성' + this);
      instance = this;
    }

    return instance;
  }

  async create(modelObj) {
    const {
      userId
    } = modelObj;
    const user = await _models.User.findOne({
      where: {
        id: userId
      }
    });
    if (user == null) throw Error('USER_NOT_FOUND');else {
      return await _models.PaymentRecord.create(modelObj);
    }
  }

  async findList(where) {
    return await _models.PaymentRecord.findAll({
      where: JSON.parse(JSON.stringify(where))
    });
  }

  async findOne(where) {
    return await _models.PaymentRecord.findOne({
      where: JSON.parse(JSON.stringify(where))
    });
  }

  async update(id, modelObj) {
    await _models.PaymentRecord.update(modelObj, {
      where: {
        id
      }
    });
    const updatePaymentRecord = await _models.PaymentRecord.findOne({
      where: {
        id
      }
    });
    if (updatePaymentRecord === null) throw Error('PAYMENT_RECORD_NOT_FOUND');
    return updatePaymentRecord;
  }

  async delete(id) {
    const paymentRecord = await _models.PaymentRecord.findOne({
      where: {
        id
      }
    });

    if (paymentRecord == null) {
      throw Error('PAYMENT_RECORD_NOT_FOUND');
    } else {
      await paymentRecord.destroy();
    }
  }

}

var _default = new PaymentRecordService();

exports.default = _default;