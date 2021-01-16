import { blackListService } from '../services'
import Joi from '@hapi/joi'

import { createErrorResponse } from '../utils/functions'

export default class blackListController {

  static async create ( req, res ) {

    try { 

      const result = await Joi.validate ( req.body, {
        teacherId : Joi.number().required(),
        problemId : Joi.number().required()
      })

      const { teacherId , problemId  } = result

      const modelObj = {
        problemId ,
        teacherId
      }


      await blackListService.create(modelObj)

      const response = {
        success : true
      }

      res.send(response)

    } catch ( e ) {
      res.send(createErrorResponse(e))
    }

  }

  static async findList( req, res) {

    try {

      const result = await Joi.validate ( req.body,{
        teacherId : Joi.number().required()
      })

      const { teacherId } = result 

      const blackList = await blackListService.findList({teacherId})

    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

}