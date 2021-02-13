import { homeworkService , noteService , teacherService} from '../services'
import Joi from '@hapi/joi'

import { createErrorResponse } from '../utils/functions'
import { Homework } from '../models'

export default class homeworkController {


  static async create ( req, res ) {

    try { 

      console.log("숙제를 만들어보자")

      const result = await Joi.validate ( req.body, {

        problemIdList : Joi.array().required(),
        title : Joi.string().required(),
        numChapters : Joi.number().required(),
        mainChapter : Joi.string().required(),
        userIdList : Joi.array().required()
      })

      const { user } = req

      const teacher = await teacherService.findOne({userId : user.id})

      const { problemIdList ,title, numChapters , mainChapter, userIdList} = result 

      for ( let i = 0 ; i < userIdList.length ; i++) {

        const modelObj = {
          title,
          teacherId : teacher.id,
          userId : userIdList[i],
          numChapters,
          mainChapter
        }
        
        const newHomework = await homeworkService.create(modelObj)

        for ( let j = 0 ; j < problemIdList.length; j++) {

          const modelObj = {
            problemId : problemIdList[j],
            homeworkId : newHomework.id,
            userId : userIdList[i]
          }
  
          await noteService.create(modelObj)
        }
        
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

      const result = await Joi.validate(req.query,{

        userId : Joi.number().required()
      })

      const { userId } = result 

      const homeworkList = await homeworkService.findList({userId})

      const response = {
        success : true,
        data : {
          homeworkList
        }
      }

      res.send(response)


    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

  static async findOne ( req, res) {

    try {

      const id = req.params.id

      const homework = await homeworkService.findOne({id})

      if ( homework == null ) throw Error('HOMEWORK_NOT_FOUND')

      const response = {
        success : true,
        data : {
          homework
        }
      }

      res.send(response)


    } catch ( e) {
      res.send(createErrorResponse(E))
    }
  }

  static async update ( req, res) {


    try {

      const result = await Joi.validate ( req.body, {
        status : Joi.optional()
      })

      const { status } = result 

      await homeworkService.update({status})

      const response = {
        success : true
      }

      res.send(response)


    } catch ( e ) {

      res.send(createErrorResponse(e))
    }
  }

}