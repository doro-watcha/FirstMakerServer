import { problemService, smallChapterService, middleChapterService, bigChapterService ,noteService, studentService, blackListService } from '../services'
import Joi from '@hapi/joi'

import { createErrorResponse } from '../utils/functions'
import Problem from '../models/Problem'

export default class problemController {


  static async create ( req, res ) {

    try { 



      const result = await Joi.validate( req.body, {
        subjectId : Joi.number().required(),
        bigChapterId : Joi.number().required(),
        middleChapterId : Joi.number().required(),
        smallChapterId : Joi.number().required(),
        level : Joi.string().required(),
        answer : Joi.string().required(),
        source : Joi.optional(),
        isMultipleQuestion : Joi.number().optional()

      })

      const files = await Joi.validate(req.files, {
				problem: Joi.array()
					.min(1)
					.required(),
				solution: Joi.array()
					.min(1)
					.optional(),
			})
      
      const { subjectId, bigChapterId, middleChapterId, smallChapterId, level, source ,answer, isMultipleQuestion } = result 

      const { problem ,solution } = files 

      var solutionUrl = null 
      if ( solution !== undefined ) solutionUrl = "https://sp-problem-bank.s3.ap-northeast-2.amazonaws.com/" + solution[0].key

      const modelObj = {
        problemUrl : "https://sp-problem-bank.s3.ap-northeast-2.amazonaws.com/" + problem[0].key,
        solutionUrl,
        subjectId,
        bigChapterId,
        middleChapterId,
        smallChapterId,
        level,
        source,
        answer,
        isMultipleQuestion
      }

      const newProblem = await problemService.create(modelObj)

      const response = {
        success : true,
        data : {
          problem : newProblem 
        }
      }

      res.send(response)

    }

    catch (e){
      res.send(createErrorResponse(e))
    }

  }


  static async findList ( req, res) {

    try {
      const result = await Joi.validate ( req.body, {
        smallChapterIdList : Joi.array().required(),
        numberOfProblems : Joi.array().required(),
        isNotDuplicated : Joi.boolean().optional(),
        minLevel : Joi.number().required(),
        maxLevel : Joi.number().required(0)
      })

      const { smallChapterIdList , numberOfProblems , isNotDuplicated , minLevel, maxLevel } = result

      const { user } = req

      var problemSetList = []
      var problemList = []
      var myProblemList = []
      var blackList = []

      // 필터에서 이미 푼 문제는 안풀고 싶을때 
      if ( isNotDuplicated === true ) {

        const student = await studentService.findOne({userId : user.id})
        myProblemList = await noteService.findList({studentId : student.id})

        console.log("검색한다음에 바로 찍어보는것")
        console.log(myProblemList)
        myProblemList = myProblemList.map( myProblem => myProblem.problem.id)

        console.log("map 한 번 함")
        console.log(myProblemList)
      }

      console.log(user.teacherId)
      // 선생님들은 블랙리스트 문제 제외하고 검색하자 
      if ( user.teacherId !== undefined) {

        blackList = await blackListService.findList({teacehrId})
        blackList = blackList.map ( blackList => blackList.problem.id)

      }

      for ( var i = 0 ; i < smallChapterIdList.length ; i++){

        var problems = await problemService.findList(smallChapterIdList[i], numberOfProblems[i], minLevel, maxLevel )

        // 중복 문제를 선택하지 않는 필터를 체크 했으므로, 중복 문제가 있는지 검사를 한다, 검사를 해서 있을 경우 그만금 다시 뽑아준다.
        while ( isNotDuplicated === true ) {

          console.log("Duplicate ComeOn")

          var duplicatedList = []
          var duplicatedNum = 0

          problems.forEach(function(problem ,index) {

            console.log("forEach에 있는 현재 문제")
            console.log(problem.id)
            console.log("내가 지금까지 풀엇던 문제 ")
            console.log(myProblemList)

            if ( myProblemList.includes(problem.id)) {
              duplicatedNum++
              duplicatedList.push(problem.id)
              problems.splice(index,1)
            }
          })

          if ( duplicatedNum === 0 ) break;
          else {
            var additionalProblems = await problemService.findAdditionalList(smallChapterIdList[i], duplicatedNum, duplicatedList, minLevel, maxLevel )

            if ( additionalProblems == null ) break;
            problems.concat(additionalProblems)
          }
        }

        // 선생님의 경우에는 blacklist는 제외하고 보내준다 
        while ( blackList.length > 0 ) {

          var filteredList = []
          var filteredNum = 0 


          problems.forEach( function (problem, index) {

            if ( blackList.includes(problem.id)) {
              filteredNum++
              filteredList.push(problem.id)
              problems.splice(index,1)

            }
          })

          if ( filteredNum == 0 ) break;
          else {
            var additionalProblems = await problemService.findAdditionalList(smallChapteridList[i], filteredNum, filteredList, minLevel, maxLevel )
            problems.concat(additionalProblems)
          }
        }
        

        var smallChapter = await smallChapterService.findOne({id : smallChapterIdList[i]})
        var middleChapter = await middleChapterService.findOne({ id : smallChapter.middleChapterId})
        var bigChapter = await bigChapterService.findOne({ id : middleChapter.bigChapterId})
        var problemSet = {
          problems,
          smallChapter,
          middleChapter,
          bigChapter
        }
        
        problemSetList.push(problemSet)

        for ( var j = 0 ; j < problems.length ; j++) {
          problemList.push(problems[j])
        }

      }
      

      const response = {
        success : true,
        data : {
          problems : problemList,
          problemSetList 
        }
      }

      res.send(response)

    } 
    catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

  static async replace ( req,res) {

    try {

      const result = await Joi.validate(req.query,{
        numProblem : Joi.number().required(),
        filterList : Joi.array().required(),
        smallChapterId : Joi.number().required(),
        minLevel: Joi.number().required(),
        maxLevel : Joi.number().required()
      })

      const { numProblem, filterList, smallChapterId, minLevel, maxLevel } = result 

      const problems = await problemService.findAdditionalList(smallChapterId, numProblem, filterList, minLevel, maxLevel )

      const response = {
        success : true,
        data : {
          problems
        }
      }

      res.send(response)

    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

  static async search ( req, res) {

    try {

      const result = await Joi.validate(req.query,{

        problemUrl : Joi.string().optional(),
        subjectId : Joi.number().optional(),
        bigChapterId : Joi.number().optional(),
        middleChapterId : Joi.number().optional(),
        smallChapterId : Joi.number().optional(),
        source : Joi.string().optional(),
        level : Joi.number().optional()
      })

      console.log("무제")
      console.log("무제")

      const  { problemUrl, subjectId, bigChapterId, middleChapterId, smallChapterId, source, level  } = result

      const modelObj = {
        subjectId,
        bigChapterId,
        middleChapterId,
        smallChapterId,
        source,
        level
      }

      const problems = await problemService.search(problemUrl, modelObj )

      const response = {
        success  : true,
        data : {
          problems
        }
      }

      res.send(response)

    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

  static async update ( req , res) {

    try {
      
      const id = req.params.id

      const result = await Joi.validate(req.body,{
        subjectId : Joi.number(),
        bigChapterId : Joi.number(),
        middleChapterId : Joi.number(),
        smallChapterId : Joi.number(),
        source : Joi.string(),
        level : Joi.number(),
        answer : Joi.string(),
        isMultipleQuestion : Joi.number()
      })

      const files = await Joi.validate(req.files, {
				problem: Joi.array()
          .min(1)
          .optional(),
				solution: Joi.array()
					.min(1)
					.optional(),
			})

      const { subjectId , bigChapterId, middleChapterId, smallChapterId, source, level, answer  ,isMultipleQuestion} = result 


      const { problem ,solution } = files 


      var problemUrl = undefined 
      if ( problem !== undefined ) problemUrl = "https://mathproblem.s3.us-east-2.amazonaws.com/" + problem[0].key

      var solutionUrl = undefined 
      if ( solution !== undefined ) solutionUrl = "https://mathproblem.s3.us-east-2.amazonaws.com/" + solution[0].key

      const modelObj = {
        problemUrl,
        solutionUrl,
        subjectId,
        bigChapterId,
        middleChapterId,
        smallChapterId,
        source,
        level,
        answer,
        isMultipleQuestion
      }

      await problemService.update(id,modelObj)

      const response = {
        success : true
      }
      
      res.send(response)


    } catch ( e) {
      res.send(createErrorResponse(e))
    }
  }

}