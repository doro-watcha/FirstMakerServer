import { majorService } from '../services'
import Joi from '@hapi/joi'

import { createErrorResponse } from '../utils/functions'

export default class majorController {

  static async createMajor ( req, res ) {

    try {

      const result = await Joi.validate(req.body, {
        major : Joi.string().required(),
        strong_val : Joi.number().required(),
        safe_val : Joi.numebr().required(),
        dangerous_val : Joi.number().required(),
        sniping_val : Joi.number().required(),
        year : Joi.number().required(),
        line : Joi.string().required(),
        group : Joi.string().required()
      })

      const {  name , strong_val ,safe_val, dangerous_val , sinping_val, year, line , group } = result 

      const modelObj = {
        name : name,
        strong_val : strong_val,
        safe_val : safe_val,
        dangerous_val : dangerous_val,
        sniping_val : sinping_val,
        year : year,
        line : line,
        group : group
      }

      const majorObj = await majorService.create(modelObj)

      const response = {

        success : true ,
        data : {
          majorObj
        }
      }

      res.send(response)
    
    } catch(e) {
      res.send(createErrorResponse(e))
    }
  }
  

  static async findList(req,res) {

    try { 
    const univId = req.params.univId

    const { user } = req
  
    const majors = await majorService.findList(univId, user.line)

    const response = {
      success : true ,
      data : {
        majors
      }
    }

      res.send(response)
    } catch (e) {
      res.send(createErrorResponse(e))
    }
  }
  

  static async updateMajor ( req, res ) {

    try {

      const id = req.params.id

      const result = await Joi.validate ( req.body , {
        line : Joi.string(),
        group : Joi.string(),
        name : Joi.string(),
        strong_val : Joi.number(),
        safe_val : Joi.number(),
        dangerous_val : Joi.number(),
        sniping_val : Joi.number(),
        year : Joi.number(),
        admissionType : Joi.string(),
        recruitmentNumber : Joi.number(),
        additionalMember : Joi.number(),
        competitionNumber : Joi.number(),
        isNaesinIncluded : Joi.boolean(),
        somethingSpecial : Joi.string(),
        etc : Joi.string()
      })

      const { line ,group  , name, strong_val, safe_val, dangerous_val, sniping_val, year, admissionType, recruitmentNumber, additionalMember, competitionNumber, isNaesinIncluded, somethingSpecial, etc } = result

      const finalNumber = recruitmentNumber + additionalMember
      const modelObj = {
        line : line ,
        group : group,

        major : major,
        strong_val : strong_val,
        safe_val : safe_val,
        dangerous_val : dangerous_val,
        sniping_val : sniping_val,
        year : year,
        admissionType : admissionType ,
        recruitmentNumber : recruitmentNumber,
        additionalMember : additionalMember,
        finalNumber : finalNumber,
        competitionNumber : competitionNumber,
        isNaesinIncluded : isNaesinIncluded,
        somethingSpecial : somethingSpecial,
        etc : etc 
      }

      const majorObj = await majorService.update(id ,modelObj)

      const response = {
        success : true ,
        data : {
          majorObj
        }
      }

      res.send(response)

    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

  static async deleteMajor ( req, res ) {

    try {


      const id = req.params.id 

      await majorService.delete(id)

      const response = {
          success : true 
      }

      res.send(response)


    } catch ( e) {
        res.send(createErrorResponse(e))
    }
  }



}