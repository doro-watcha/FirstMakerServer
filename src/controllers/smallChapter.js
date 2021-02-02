import { smallChapterService } from '../services'
import Joi from '@hapi/joi'

import { createErrorResponse } from '../utils/functions'
import SmallChapter from '../models/SmallChapter'

export default class smallChapterController {


  static async create ( req, res ) {

    try { 

      const result = await Joi.validate ( req.body, {
        middleChapterId : Joi.number().required(),
        name : Joi.string().required()
      })

      const { middleChapterId , name } = result 

      const modelObj = { 
        middleChapterId , name 
      }

      const newSmallChapter = await smallChapterService.create(modelObj)

      const response = {
        success : true ,
        data : {
          smallChapter : newSmallChapter
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
        middleChapterId : Joi.number()
      })

      const { middleChapterId } = result

      const where = {
        middleChapterId
      }

      const smallChapters = await smallChapterService.findList(where)

      const response = {
        success : true ,
        data : {
          smallChapters
        }
      }

      res.send(response)
    }
    catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

  static async delete ( req, res) {

    try {

      const id = req.params.id 

      await smallChapterService.delete(id)

      const response = {
        success : true
      }

      res.send(response)


    } catch ( e ) {

      res.send(createErrorResponse(e))
    }
  }

}