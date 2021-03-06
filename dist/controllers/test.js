"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = require("../services");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _xlsx = _interopRequireDefault(require("xlsx"));

var _mime = _interopRequireDefault(require("mime"));

var _path = _interopRequireDefault(require("path"));

var _functions = require("../utils/functions");

var _report = _interopRequireDefault(require("./report"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class testController {
  static async uploadFile(req, res) {
    try {
      const files = await _joi.default.validate(req.files, {
        excel: _joi.default.array().min(1).required()
      });
      const response = {
        success: true
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async downloadFile(req, res) {
    try {
      const file = '../excelfile/test.xlsx';

      const mimetype = _mime.default.getType(file);

      const filename = _path.default.basename(file);

      res.download(file, 'test.xlsx');
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async parse(req, res) {
    try {
      await _services.testService.deleteAll();
      const result = await _joi.default.validate(req.query, {
        societyUserId: _joi.default.number().required(),
        scienceUserId: _joi.default.number().required()
      });
      const {
        societyUserId,
        scienceUserId
      } = result;
      const user = {
        req
      };
      const path = '../excelfile/test.xlsx';

      let workbook = _xlsx.default.readFile(path, {
        sheetRows: 5603
      });

      let sheetsList = workbook.SheetNames;

      let sheetData = _xlsx.default.utils.sheet_to_json(workbook.Sheets[sheetsList[0]], {
        header: 1,
        defval: '',
        blankrows: true
      });

      const scienceScore = await _services.scoreService.findOne({
        userId: scienceUserId
      });
      const societyScore = await _services.scoreService.findOne({
        userId: societyUserId
      });
      let data = []; // ????????? ????????? 

      for (let i = 3; i < 5603; i++) {
        const majorData = await _services.majorDataService.findOne({
          id: 2 * i - 5
        });
        var value = -1;

        if (sheetData[i][0] == "??????") {
          value = await _report.default.getScore(societyScore, majorData, false);
        } else {
          value = await _report.default.getScore(scienceScore, majorData, false);
        }

        const answer = parseFloat(sheetData[i][7]);
        var determinant = 0;

        if (value < answer && answer - value < answer * 0.1) {
          determinant = 1;
        }

        if (value > answer && value - answer < answer * 0.1) {
          determinant = 1;
        }

        console.log("zxcvzxvxzcvz");
        let obj1 = {
          id: i - 2,
          line: sheetData[i][0],
          // ?????? 
          group: sheetData[i][1],
          // ??? 
          name: sheetData[i][2],
          // ?????????
          recruitmentType: sheetData[i][3],
          // ????????????
          major: sheetData[i][4],
          // ????????????
          total: sheetData[i][6],
          score: sheetData[i][7],
          test: value,
          result: determinant
        };
        data.push(obj1);
        await _services.testService.create(obj1);
      }

      const response = {
        success: true,
        data: data
      };
      res.send(response);
    } catch (e) {}
  }

  static async getList(req, res) {
    try {
      const list = await _services.testService.findAll();
      const response = {
        success: true,
        data: {
          list
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async test(req, res) {
    try {} catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

}

exports.default = testController;