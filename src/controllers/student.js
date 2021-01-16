import { studentService } from '../services'
import Joi from '@hapi/joi'

import { createErrorResponse } from '../utils/functions'

export default class studentController {

  static async create ( req,res) {

    try {



    }

    catch ( e) {
      res.send(createErrorResponse(e))
    }
  }



  static async findList(req,res) {

    try {

      const result = Joi.validate ( req.query,{

      })

      
      const where = {
    
      }

      const students = await studentService.findList(where)

      const response = {
        success : true ,
        data : {
          students
        }
      }

      res.send(response)


    } catch ( e ) {
      res.send(createErrorResponse(e))
    }

  }
}

