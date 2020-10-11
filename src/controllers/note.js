import { noteService } from '../services'
import Joi from '@hapi/joi'

import { createErrorResponse } from '../utils/functions'
import Note from '../models/Note'

export default class noteController {


  static async create ( req, res ) {

    try { 

      const result = await Joi.validate ( req.body, {
        homeworkId : Joi.number(),
        examId : Joi.number(),
        problemId : Joi.number().required(),

      })

      const { homeworkId , examId , problemId } = result 


      const modelObj = {
        homeworkId,
        examId,
        problemId
      }

      const newNote = await noteService.create(modelObj)

      const response = {

        success : true ,
        data : {
          note : newNote 
        }
      }

      res.send(response)

    } catch ( e) {
      res.send(createErrorResponse(e))
    }
  }

  static async findList ( req, res) {


    try {


    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

}