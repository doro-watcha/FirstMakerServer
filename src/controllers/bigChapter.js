import { bigChapterService } from '../services'
import Joi from '@hapi/joi'

import { createErrorResponse } from '../utils/functions'
import BigChapter from '../models/BigChapter'

export default class bigChapterController {

  static async create ( req, res ) {

    try { 

      const result = await Joi.validate ( req.body, {
        subjectId : Joi.number().required(),
        name : Joi.string().required()
      })

      const { subjectId , name } = result 

      const modelObj = { 
        subjectId , name 
      }

      const newBigChaper = await bigChapterService.create(modelObj)

      const response = {
        success : true ,
        data : {
          bigChapter : newBigChaper
        }
      }

      res.send(response)

    
    }
    catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }


  static async findOne ( req, res ) {

  }


  static async findList ( req, res ) {

    try { 

      const result = await Joi.validate  ( req.query , {
        subjectId : Joi.number()
      })

      const { subjectId} = result

      const where = {
        subjectId
      }

      const bigChapters = await bigChapterService.findList(where)

      const response = {
        success : true ,
        data : {
          bigChapters
        }
      }

      res.send(response)
    }
    catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }
}
