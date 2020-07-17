import { reportService } from '../services'
import Joi from '@hapi/joi'

import { createErrorResponse } from '../utils/functions'

export default class reportController {

  static async create ( req, res ) {

    try {
      const { user } = req
      const result = await Joi.validate ( req.body, {
        score : Joi.number(),
        majorId : Joi.number()
      })

      const { score , majorId  } = result



      const modelObj = {
        score,
        majorId,
        userId : user.id
      }

      const report = await reportService.create(modelObj)

      const response = {
        success : true ,
        data : {
          report
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

      const report = await reportService.findOne({id})

      const response = {
        success : true,
        data : {
          report
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
      const reports = await reportService.findList(user.id)

  

      const response = {
        success : true,
        data : {
          reports
        }
      }
      res.send(response)

    } catch ( e ) {

      res.send(createErrorResponse(e))
    }

  }

  static async update ( req, res) {

    try {

      const id = req.params.id

      const result = await Joi.validate (req.body ,{
        score : Joi.number(),
        majorId : Joi.number(),
        userId : Joi.number()
      })

      const { score, majorId, userId } = result

      const modelObj = {
        score , majorId, userId 
      }

      const updateReport = await reportService.update(id , modelObj )

      const response = {
        success : true,
        data : {
          updateReport 
        }
      }

      res.send(response)

       
    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

  static async delete ( req, res ) {

    try {


    } catch ( e ) { 
      res.send(createErrorResponse(e))
    }


  }

}
