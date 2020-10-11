import { homeworkService , noteService } from '../services'
import Joi from '@hapi/joi'

import { createErrorResponse } from '../utils/functions'
import Homework from '../models/Homework'

export default class homeworkController {


  static async create ( req, res ) {

    try { 

      const result = await Joi.validate ( req.body, {

        problemIdList : Joi.array.required(),
        dueDate : Joi.date.required(),
        name : Joi.string()

      })

      const { user } = req.user

      const { problemIdList, dueDate } = result 

      const homeworkObj = {
        name,
        dueDate,
        authorId : user.id
      }

      const oldHomework = await homeworkService.findOne(homeworkObj)

      // 마감날짜와 숙제 이름이 같으면 이미 존재한다고 판단
      if ( oldHomework ) throw Error('HOMEWORK_ALREADY_EXISTS')

      const newHomework = await homeworkService.create(homeworkObj)
    
      for ( var i = 0 ; i < problemIdList.length(); i++) {

        const modelObj = {
          problemId : problemIdList[i],
          homeworkId : newHomework.id,
          status : "READY"
        }

        await noteService.create(modelObj)
      }

      const response = {
        success : true 
      }

      res.send(response)


    } catch ( e ) {
      res.send(createErrorResponse(e))
    }

  }

  static async findList(req ,res) {

    try {


    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

}