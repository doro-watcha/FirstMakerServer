import { majorService } from '../services'
import Joi from '@hapi/joi'

import { createErrorResponse } from '../utils/functions'

export default class majorController {

  static async createMajor ( req, res ) {

    try {

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
        etc : Joi.string(),
        univId : Joi.number()
      })

      const { line ,group  , name, strong_val, safe_val, dangerous_val, sniping_val, year, admissionType, recruitmentNumber, additionalMember, competitionNumber, isNaesinIncluded, somethingSpecial, etc , univId} = result

      const finalNumber = recruitmentNumber + additionalMember
      const modelObj = {
        line,
        group,
        name,
        strong_val,
        safe_val,
        dangerous_val,
        sniping_val,
        year,
        admissionType,
        recruitmentNumber,
        additionalMember,
        finalNumber,
        competitionNumber,
        isNaesinIncluded,
        somethingSpecial,
        etc,
        univId
      }

      const exist_major = await majorService.findByName(name, univId)

      if ( exist_major != null ) throw Error('MAJOR_ALREADY_EXISTS')

      

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


  static async findAll( req, res) {

    try {
      const majors = await majorService.findAll()

      const response = {

        success : true ,
        data : {
          majors
        }
      }
      res.send(response)


    } catch ( e ) {
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
        etc : Joi.string(),
        univId : Joi.number()
      })

      const { line ,group  , name, strong_val, safe_val, dangerous_val, sniping_val, year, admissionType, recruitmentNumber, additionalMember, competitionNumber, isNaesinIncluded, somethingSpecial, etc , univId} = result

      const finalNumber = recruitmentNumber + additionalMember
      const modelObj = {
        line,
        group,
        name,
        strong_val,
        safe_val,
        dangerous_val,
        sniping_val,
        year,
        admissionType,
        recruitmentNumber,
        additionalMember,
        finalNumber,
        competitionNumber,
        isNaesinIncluded,
        somethingSpecial,
        etc,
        univId
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