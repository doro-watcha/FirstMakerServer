import { consultingService } from '../services'
import Joi from '@hapi/joi'

import { createErrorResponse } from '../utils/functions'

export default class consultingController {

  static async createConsulting ( req, res ) {

    try {

      const result = await Joi.validate (req.body , {
        title : Joi.string().required(),
        description : Joi.string().required(),
        userId : Joi.number()
      
      })

      const { title , description , userId } = result 

      const modelObj = {
        title,
        description,
        studentId : userId
      }

      const consulting = await consultingService.create(modelObj)

      const response = {
        success : true ,
        data : {
          consulting
        }
      }

      res.send(response)

    } catch ( e ) {

      res.send(createErrorResponse(e))
    }

  }

  static async findList (req, res ) {

    try { 
      const consulting = await consultingService.findAll()

      const response = {
        success : true ,
        data : {
          consulting
        }
      }

      res.send(response)
    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

  static async findOne ( req, res ) {

    try {

      const id = req.params.id

      const consulting = await consultingService.findOne(id)

      const response = {
        success : true,
        data : {
          consulting
        }
      }

      res.send(response)

    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

  static async updateConsulting(req,res) {

    try {

      const id = req.params.id
      const result = await Joi.validate (req,body , {
        title : Joi.string().required(),
        description : Joi.string().required(),
        studentId : Joi.number()
      
      })

      const { title , description , studentId } = result 

      const modelObj = {
        title,
        description,
        studentId
      }

      const consulting = await consultingService.update(id , modelObj)

      const response = {
        success : true,
        data : {
          consulting
        }
      }

      res.send(response)
    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

  static async deleteConsulting( req, res ) {

    try { 

      const id = req.params.id

      await consultingService.delete(id)

      const response = {
        success : true
      }

      res.send(response)
    } catch ( e ) {
      res.send(createErrorResponse(e))
    }


  }

}