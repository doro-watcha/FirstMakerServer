"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = require("../services");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _functions = require("../utils/functions");

var _Problem = _interopRequireDefault(require("../models/Problem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class problemController {
  static async create(req, res) {
    try {
      console.log("wow");
      console.log(req.body);
      const result = await _joi.default.validate(req.body, {
        subjectId: _joi.default.number().required(),
        bigChapterId: _joi.default.number().required(),
        middleChapterId: _joi.default.number().required(),
        smallChapterId: _joi.default.number().required(),
        level: _joi.default.string().required(),
        answer: _joi.default.string().required(),
        source: _joi.default.optional()
      });
      const files = await _joi.default.validate(req.files, {
        problem: _joi.default.array().min(1).required(),
        solution: _joi.default.array().min(1).required()
      });
      const {
        subjectId,
        bigChapterId,
        middleChapterId,
        smallChapterId,
        level,
        source,
        answer
      } = result;
      const {
        problem,
        solution
      } = files;
      const modelObj = {
        problemUrl: "https://mathproblem.s3.us-east-2.amazonaws.com/" + problem[0].key,
        solutionUrl: "https://mathproblem.s3.us-east-2.amazonaws.com/" + solution[0].key,
        subjectId,
        bigChapterId,
        middleChapterId,
        smallChapterId,
        level,
        source,
        answer
      };
      const newProblem = await _services.problemService.create(modelObj);
      const response = {
        success: true,
        data: {
          problem: newProblem
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async findList(req, res) {
    try {
      const result = await _joi.default.validate(req.body, {
        smallChapterIdList: _joi.default.array().required(),
        numberOfProblems: _joi.default.array().required(),
        isNotDuplicated: _joi.default.boolean().optional()
      });
      const {
        smallChapterIdList,
        numberOfProblems,
        isNotDuplicated
      } = result;
      console.log(smallChapterIdList);
      console.log(numberOfProblems);
      console.log(isNotDuplicated);
      const {
        user
      } = req;
      var problemSetList = [];
      var problemList = [];
      var myProblemList = [];
      var blackList = []; // 필터에서 이미 푼 문제는 안풀고 싶을때 

      if (isNotDuplicated === true) {
        const student = await _services.studentService.findOne({
          userId: user.id
        });
        myProblemList = await _services.noteService.findList({
          studentId: student.id
        });
        myProblemList = myProblemList.map(myProblem => myProblem.problem.id);
      }

      console.log(user.teacherId); // 선생님들은 블랙리스트 문제 제외하고 검색하자 

      if (user.teacherId !== undefined) {
        blackList = await _services.blackListService.findList({
          teacehrId
        });
        blackList = blackList.map(blackList => blackList.problem.id);
      }

      for (var i = 0; i < smallChapterIdList.length; i++) {
        var problems = await _services.problemService.findList(smallChapterIdList[i], numberOfProblems[i]); // 중복 문제를 선택하지 않는 필터를 체크 했으므로, 중복 문제가 있는지 검사를 한다, 검사를 해서 있을 경우 그만금 다시 뽑아준다.

        while (isNotDuplicated === true) {
          console.log("Duplicate ComeOn");
          var duplicatedList = [];
          var duplicatedNum = 0;
          problems.forEach(function (problem, index) {
            console.log(problem.id);
            console.log(myProblemList);

            if (myProblemList.includes(problem.id)) {
              duplicatedNum++;
              duplicatedList.push(problem.id);
              problems.splice(index, 1);
            }
          });
          if (duplicatedNum === 0) break;else {
            var additionalProblems = await _services.problemService.findAdditionalList(smallChapterIdList[i], duplicatedNum, duplicatedList);
            problems.push(additionalProblems);
          }
        }

        while (blackList.length > 0) {
          var filteredList = [];
          var filteredNum = 0;
          problems.forEach(function (problem, index) {
            if (blackList.includes(problem.id)) {
              filteredNum++;
              filteredList.push(problem.id);
              problems.splice(index, 1);
            }
          });
          if (filteredNum == 0) break;else {
            var additionalProblems = await _services.problemService.findAdditionalList(smallChapteridList[i], filteredNum, filteredList);
            problems.push(additionalProblems);
          }
        }

        var smallChapter = await _services.smallChapterService.findOne({
          id: smallChapterIdList[i]
        });
        var middleChapter = await _services.middleChapterService.findOne({
          id: smallChapter.middleChapterId
        });
        var bigChapter = await _services.bigChapterService.findOne({
          id: middleChapter.bigChapterId
        });
        var problemSet = {
          problems,
          smallChapter,
          middleChapter,
          bigChapter
        };
        problemSetList.push(problemSet);

        for (var j = 0; j < problems.length; j++) {
          problemList.push(problems[j]);
        }
      }

      const response = {
        success: true,
        data: {
          problems: problemList,
          problemSetList
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async replace(req, res) {
    try {
      const result = await _joi.default.validate(req.query, {
        numProblem: _joi.default.number().required(),
        filterList: _joi.default.array().required(),
        smallChapterId: _joi.default.number().required()
      });
      const {
        numProblem,
        filterList,
        smallChapterId
      } = result;
      const problems = await _services.problemService.findAdditionalList(smallChapterId, numProblem, filterList);
      const response = {
        success: true,
        data: {
          problems
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

}

exports.default = problemController;