"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mime = _interopRequireDefault(require("mime"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _xlsx = _interopRequireDefault(require("xlsx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let instance = null;

class FileService {
  constructor() {
    if (!instance) {
      console.log('File Service 생성' + this);
      instance = this;
    }

    return instance;
  }

  async majorParse(modelObj) {}

}

var _default = new FileService();

exports.default = _default;