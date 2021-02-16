import { sourceService } from '../services'
import Joi from '@hapi/joi'

import { createErrorResponse } from '../utils/functions'

export default class sourceController {

  static async create(req,res) {

    try {

      const name = req.body.name

      const modelObj = {
        name 
      }

      await sourceService.create(modelObj)

      const response = {
        success : true 
      }

      res.send(response)


    } catch ( e ) {
      res.send(createErrorResponse(e))
    }

  }

  static async listSources ( req,res) {

    try {

      const sources = await sourceService.findAll()

      const response = {
        success : true,
        data : {
          sources 
        }
      }

      res.send(response)

    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

  


}