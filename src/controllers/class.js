import { classService , classBelongsService} from '../services'
import Joi from '@hapi/joi'

import { createErrorResponse } from '../utils/functions'

export default class classController {

  static async create ( req, res ) {

    try { 

      const result = await Joi.validate ( req.body, {
        name : Joi.string().required(),
        studentIdList : Joi.array().optional(),
        teacherId : Joi.number().required()
      })

      const { name , studentIdList, teacherId  } = result

      console.log(name)
      console.log(studentIdList)
      console.log(teacherId)
      const modelObj = {
        name ,
        teacherId
      }


      const newClass = await classService.create(modelObj)

      if ( studentIdList !== undefined ) {
        for ( let i = 0 ; i < studentIdList.length ; i++) {

          let classBelongs = {
            studentId : studentIdList[i],
            classId : newClass.id 
          }

          await classBelongsService.create(classBelongs)
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


  static async findOne ( req, res) {

    try {

      const id = req.params.id 

      const classInfo = await classService.findOne({id})

      if (classInfo == null) throw Error('CLASS_NOT_FOUND')

      const response = {
        success : true,
        data : {
          class : classInfo
        }
      }

      res.send(response)



    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

  static async findList ( req, res) {

    try {

      const result = await Joi.validate ( req.query, {
        teacherId : Joi.number().required()
      })

      const { teacherId }  = result 

      const classes = await classService.findList({teacherId})

      const response = {
        success : true ,
        data : {
          classes
        }
      }

      res.send(response)



    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

  static async addStudent ( req, res) {

    try { 

      const result = await Joi.validate ( req.body, {
        studentId : Joi.number().required(),
        classId : Joi.number().required()
      })

      const { studentId , classId } = result 

      const modelObj = {
        studentId,
        classId
      }

      const alreadyStudent = await classBelongsService.findOneByStudentId(studentId)

      if ( alreadyStudent != null) throw Error('STUDENT_ALREADY_EXISTS')

      await classBelongsService.create(modelObj)

      const response = {
        success : true
      }
      
      res.send(response)
    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

  static async deleteStudent ( req, res) {

    try {
      
      const result = await Joi.validate ( req.body,{
        studentId : Joi.number().required(),
        classId : Joi.number().required()
      })

      const { studentId , classId } = result 

  

      await classBelongsService.delete(studentId, classId)

      const response = {
        success : true
      }
      res.send(response)
    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

}