"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _mime = _interopRequireDefault(require("mime"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _xlsx = _interopRequireDefault(require("xlsx"));

var _services = require("../services");

var _functions = require("../utils/functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class fileController {
  static async uploadMajor(req, res) {
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

  static async donwloadMajor(req, res) {
    try {
      const file = '../excelfile/major.xlsx';

      const mimetype = _mime.default.getType(file);

      const filename = _path.default.basename(file);

      res.download(file, 'major.xlsx');
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async parseMajor(req, res) {
    try {
      await _services.majorService.deleteAll();
      await _services.majorDataService.deleteAll();
      const path = '../excelfile/major.xlsx';

      let workbook = _xlsx.default.readFile(path, {
        sheetRows: 5657
      });

      let sheetsList = workbook.SheetNames;

      let sheetData = _xlsx.default.utils.sheet_to_json(workbook.Sheets[sheetsList[0]], {
        header: 1,
        defval: '',
        blankrows: true
      });

      let data = [];

      for (let i = 3; i < 5657; i++) {
        /**
         * 앞부분만 떼가지고 Major를 하나 만들어준다 ( 이거는 연도에 상관없는 metadata이므로 major로 구분 )
         */
        let obj1 = {
          id: i - 2,
          line: sheetData[i][0],
          // 인문 
          group: sheetData[i][1],
          // 다 
          location: sheetData[i][2],
          // 경남
          univName: sheetData[i][3],
          // 가야대 
          recruitmentType: sheetData[i][4],
          // 일반학생
          recruitmentUnit: sheetData[i][5],
          // 경찰행정학과 
          majorName: sheetData[i][6] // 경찰행정학과 

        };
        await _services.majorService.create(obj1);
      }

      for (let i = 3; i < 5657; i++) {
        let obj2 = {
          id: 2 * i - 5,
          year: 2020,
          majorId: i - 2,
          metadata: {
            initialMember: sheetData[i][10],
            // 1
            additionalMember: sheetData[i][11],
            // 14
            competitionRate: sheetData[i][17],
            // 2.33
            reflectionSubject: sheetData[i][29],
            // 탐,한+국,수,영중 택2
            tamguNumber: sheetData[i][31],
            // 1 
            applicationIndicator: sheetData[i][33],
            // 백분위 
            extraPoint: sheetData[i][69],
            // 특정 영역 가산 
            perfectScore: sheetData[i][74]
          },
          prediction: {
            strong: sheetData[i][23],
            safe: sheetData[i][24],
            dangerous: sheetData[i][25],
            sniping: sheetData[i][26]
          },
          ratio: {
            korean: sheetData[i][35],
            // (40)
            math: sheetData[i][37],
            // 수가나 (40)
            english: sheetData[i][39],
            // (40)
            tamgu: sheetData[i][41],
            // 사과직 10 
            foreign: sheetData[i][43],
            history: sheetData[i][45] // 10 

          },
          gradeToScore: {
            english: {
              way: sheetData[i][46],
              // 수능비율포함 
              score: sheetData[i].slice(47, 56)
            },
            history: {
              way: sheetData[i][57],
              // 수능비율포함
              score: sheetData[i].slice(58, 67)
            }
          }
        };
        await _services.majorDataService.create(obj2);
        let obj3 = {
          id: 2 * i - 4,
          year: 2021,
          majorId: i - 2,
          metadata: {
            initialMember: sheetData[i][7],
            additionalMember: sheetData[i][8],
            competitionRate: sheetData[i][16],
            reflectionSubject: sheetData[i][28],
            tamguNumber: sheetData[i][30],
            applicationIndicator: sheetData[i][32],
            extraPoint: sheetData[i][68],
            perfectScore: sheetData[i][74]
          },
          prediction: {
            strong: sheetData[i][19],
            safe: sheetData[i][20],
            dangerous: sheetData[i][21],
            sniping: sheetData[i][22]
          },
          ratio: {
            korean: sheetData[i][34],
            math: sheetData[i][36],
            english: sheetData[i][38],
            tamgu: sheetData[i][40],
            foreign: sheetData[i][42],
            history: sheetData[i][44]
          } // gradeToScore : {
          //   english : {
          //     way : sheetData[i][46],
          //     score : sheetData[i].splice(47,9)
          //   },
          //   history : {
          //     way : sheetData[i][48],
          //     score : sheetData[i].splice(49,9)
          //   }
          // }

        };
        await _services.majorDataService.create(obj3);
      }

      const response = {
        success: true
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async uploadUniv(req, res) {
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

  static async downloadUniv(req, res) {
    try {
      const file = '../excelfile/university.xlsx';

      const mimetype = _mime.default.getType(file);

      const filename = _path.default.basename(file);

      res.download(file, 'university.xlsx');
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async parseUniv(req, res) {
    try {
      await _services.universityService.deleteAll();
      const path = '../excelfile/university.xlsx';

      let workbook = _xlsx.default.readFile(path, {
        sheetRows: 50
      });

      let sheetsList = workbook.SheetNames;

      let sheetData = _xlsx.default.utils.sheet_to_json(workbook.Sheets[sheetsList[1]], {
        header: 1,
        defval: '',
        blankrows: true
      });

      let data = [];

      for (let i = 1; i < 43; i++) {
        let obj1 = {
          id: i,
          line: '인문',
          name: sheetData[i][0],
          group: sheetData[i][1],
          min: sheetData[i][2],
          max: sheetData[i][3]
        };
        await _services.universityService.create(obj1);
        data.push(obj1); // let obj2 = {
        //   line : '자연',
        //   name : sheetData[i][0],
        //   group : sheetData[i][4],
        //   min : sheetData[i][5],
        //   max : sheetData[i][6]
        // }
        //await universityService.create(obj2)
        //data.push(obj1)
      }

      const response = {
        success: true,
        data
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

}

exports.default = fileController;