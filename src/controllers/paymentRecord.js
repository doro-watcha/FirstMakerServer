import { paymentRecordService } from '../services'
import Joi from '@hapi/joi'

import { createErrorResponse } from '../utils/functions'

export default class majorController {

  static async create ( req, res ) {

    try {

      const result = await Joi.validate(req.body, {
        amount : Joi.number().required(),
        userId : Joi.number().required(),
        predictTimes : Joi.number().required()
      })

      const { amount , userId, predictTimes } = result

      const modelObj = {
        amount, userId, predictTimes
      }

      const paymentRecord = await paymentRecordService.create(modelObj)

      const response = {
        success : true ,
        data : {
          paymentRecord
        }
      }
      res.send(response)

    } catch ( e ){
      res.send(createErrorResponse(e))
    }
  }

  static async findOne ( req, res ) {

    try {
      const id = req.params.id

      const paymentRecord = await paymentRecordService.findOne(id)

      const response = {
        success : true ,
        data : {
          paymentRecord
        }
      }

      res.send(response)
    } catch ( e ) {
      res.send(createErrorResponse(e))
    }

  }

  static async findList ( req, res ) {
    try { 

      const { user } = req 

      const paymentRecord = await paymentRecordService.findList(user.id)

      const response = {
        success : true ,
        data : {
          paymentRecord
        }
      }

      res.send(response)
    } catch ( e ) {

      res.send(createErrorResponse(e))
    }
  }

  static async update ( req, res ) {

    try {

      const id = req.params.id

      const result = await Joi.validate ( req.body, {
        amount : Joi.number(),
        userId : Joi.number(),
        predictTimes : Joi.number()
      })

      const { amount , userId , predictTimes} = result 

    

      const modelObj = {
        amount , userId , predictTimes 
      }

      const paymentRecord = await paymentRecordService.update(id, modelObj)

      const response = {
        success : true ,
        data : {
          paymentRecord
        }
      }

      res.send(response)


    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

  static async delete ( req, res ) {

    try {

      const id = req.params.id 

      await paymentRecordService.delete(id)

      const response = {
        success : true 
      }

      res.send(response)


    } catch ( e ) {
      res.send(createErrorResponse(e))
    }

  }
  
}