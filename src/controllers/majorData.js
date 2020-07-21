import { majorDataService , majorService } from '../services'
import Joi from '@hapi/joi'
import { createErrorResponse } from '../utils/functions'

export default class majorDataController {

  static async create ( req, res ) {

    try {

      const result = await Joi.validate ( req.body , {
        year : Joi.number().required(),
        majorId : Joi.number().required(),
        metadata : Joi.object(),
        prediction : Joi.object(),
        ratio : Joi.object(),
        gradeToScore : Joi.object()
      })

      // metadata = initialMember , additionalMember , competitionRate, reflectionSubject, tamguNumber , applicationIndicator, extraPoint, somethingSpecial
      const { year, majorId,  metadata, prediction, ratio, gradeToScore} = result

      const modelObj = {
        year,
        majorId,
        metadata,
        prediction,
        ratio,
        gradeToScore
      }

      const already_majorData = await majorService.findOne({majorId})

      if ( already_majorData == null ) throw Error('MAJOR_NOT_FOUND')

      const majorData = await majorDataService.create(modelObj)

      const response = {
        success : true,
        data : {
          majorData
        }
      }

      res.send(response)

    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

  static async findOne(req,res) {

    try {

      const id = req.params.id

      const majorData = await majorDataService.findOne({majorId : id})

      const response = {
        success : true,
        data : {
          majorData
        }
      }

      res.send(response)

    } catch ( e ) {
      res.send(createErrorResponse(e))
    }

  }

  static async findList(req,res) {

    try {
      const result = await Joi.validate ( req.query , {
        year : Joi.number(),
        majorId : Joi.number()
      })

      // metadata = initialMember , additionalMember , competitionRate, reflectionSubject, tamguNumber , applicationIndicator, extraPoint, somethingSpecial
      const { year, majorId} = result

      const modelObj = {
        year,
        majorId
      }

      const majorData = await majorDataService.findList(modelObj)

      const response = {
        success : true,
        data : {
          majorData
        }
      }

      res.send(response)

    } catch ( e ) {
      res.send(createErrorResponse(e))
    }

  }

  static async update(req,res) {

    try {

      const id = req.params.id

      const result = await Joi.validate ( req.body , {
        year : Joi.number(),
        metadata : Joi.object(),
        prediction : Joi.object(),
        ratio : Joi.object(),
        gradeToScore : Joi.object()
      })

      // metadata = initialMember , additionalMember , competitionRate, reflectionSubject, tamguNumber , applicationIndicator, additionalPoint, somethingSpecial
      const {  year, metadata, prediction, ratio, gradeToScore} = result

      const modelObj = {
        majorId : id,
        year,
        metadata,
        prediction,
        ratio,
        gradeToScore
      }

      const majorData = await majorDataService.update(id, modelObj)

      const response = {
        success : true,
        data : {
          majorData
        }
      }

      res.send(response)

    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

  static async delete (req, res) {

    try {
      
      const id = req.params.id

      await majorDataService.delete(id)

      const response = {
        success : true
      }
      res.send(response)
    } catch ( e ) {
      res.send(createErrorResponse(e))
    }

  }

}