import { middleChapterService } from '../services'
import Joi from '@hapi/joi'

import { createErrorResponse } from '../utils/functions'
import MiddleChapter from '../models/MiddleChapter'

export default class middleChapterController {


  static async create ( req, res ) {

    try { 

      const result = await Joi.validate ( req.body, {
        bigChapterId : Joi.number().required(),
        name : Joi.string().required()
      })

      const { bigChapterId , name } = result 

      const modelObj = { 
        bigChapterId , name 
      }

      const newMiddleChapter = await middleChapterService.create(modelObj)

      const response = {
        success : true ,
        data : {
          middleChapter : newMiddleChapter
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
        bigChapterId : Joi.number()
      })

      const { bigChapterId} = result

      const where = {
        bigChapterId
      }

      const middleChapters = await middleChapterService.findList(where)

      const response = {
        success : true ,
        data : {
          middleChapters
        }
      }

      res.send(response)
    }
    catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

}