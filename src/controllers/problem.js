import { problemService } from '../services'
import Joi from '@hapi/joi'

import { createErrorResponse } from '../utils/functions'
import Problem from '../models/Problem'

export default class problemController {


  static async create ( req, res ) {

    try { 

      const result = await Joi.validate( req.body, {
        problemUrl : Joi.string().required(),
        subjectId : Joi.number().required(),
        bigChapterId : Joi.number().required(),
        middleChapterId : Joi.number().required(),
        smallChapterId : Joi.number().required(),
        level : Joi.string().required(),

      })
      
      const { problemUrl, subjectId, bigChapterId, middleChapterId, smallChapterId, level} = result 

      const modelObj = {
        problemUrl,
        subjectId,
        bigChapterId,
        middleChapterId,
        smallChapterId,
        level
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

    catch {
      res.send(createErrorResponse(e))
    }

  }


  static async findList ( req, res) {

    try {
      const result = await Joi.validate ( req.body, {
        smallChapterIdList : Joi.array(),
        numberList : Joi.array()
      })

      const { smallChapterIdList , numberList } = result


      var totalProblems = []
      
      for ( var i = 0 ; i < smallChapterIdList.length ; i++){

        var problems = await problemService.findList(smallChapterIdList[i], numberList[i])
        totalProblems.push(problems)
      }

      const response = {
        success : true ,
        data : {
          totalProblems
        }
      }

      res.send(response)

    } 
    catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

}