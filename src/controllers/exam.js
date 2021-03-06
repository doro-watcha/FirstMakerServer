import { examService , noteService, teacherService, studentService } from '../services'
import Joi from '@hapi/joi'

import { createErrorResponse } from '../utils/functions'
import { Exam } from '../models'

export default class examController {


  static async create ( req, res ) {

    try { 


      console.log("시험을 만들어보자")

      const result = await Joi.validate ( req.body, {

        problemIdList : Joi.array().required(),
        title : Joi.string().required(),
        numChapters : Joi.number().required(),
        mainChapter : Joi.string().required(),
        userIdList : Joi.array().required(),
        timeLimit : Joi.number().required()
      })

      const { user } = req

      const teacher = await teacherService.findOne({userId : user.id})

      const { problemIdList ,title, numChapters , mainChapter, userIdList, timeLimit } = result 

      if ( timeLimit === undefined ) throw Error('TIME_LIMIT_NOT_FOUND')

      for ( let i = 0 ; i < userIdList.length ; i++) {

        const modelObj = {
          title,
          teacherId : teacher.id,
          userId : userIdList[i],
          numChapters,
          mainChapter,
          timeLimit
        }
        
        const newExam = await examService.create(modelObj)

        for ( let j = 0 ; j < problemIdList.length; j++) {

          const modelObj = {
            problemId : problemIdList[j],
            examId : newExam.id,
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

      const examList = await examService.findList({userId})

      const response = {
        success : true,
        data : {
          examList
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

      const exam = await examService.findOne({id})

      if ( exam == null ) throw Error('EXAM_NOT_FOUND')

      const response = {
        success : true,
        data : {
          exam
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

      await examService.update({status})

      const response = {
        success : true
      }

      res.send(response)


    } catch ( e ) {

      res.send(createErrorResponse(e))
    }
  }

}