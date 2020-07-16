import { majorService, universityService } from '../services'
import Joi from '@hapi/joi'
import mime from 'mime'
import path from 'path'
import fs from 'fs'


import { createErrorResponse } from '../utils/functions'

export default class majorController {

  static async createMajor ( req, res ) {

    try {

      const result = await Joi.validate ( req.body , {
        line : Joi.string().required(),
        group : Joi.string().required(),
        name : Joi.string().required(),
        strong_val : Joi.number().required(),
        safe_val : Joi.number().required(),
        dangerous_val : Joi.number().required(),
        sniping_val : Joi.number().required(),
        year : Joi.number().required(),
        admissionType : Joi.string().required(),
        recruitmentNumber : Joi.number().required(),
        additionalMember : Joi.number().required(),
        competitionNumber : Joi.number().required(),
        isNaesinIncluded : Joi.boolean().required(),
        somethingSpecial : Joi.string(),
        etc : Joi.string(),
        univId : Joi.number().required()
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
      const exist_univ = await universityService.findOne(univId)

      if ( exist_major != null ) throw Error('MAJOR_ALREADY_EXISTS')

      if ( exist_univ == null ) throw Error('UNIVERSITY_NOT_FOUND')
      

      const major = await majorService.create(modelObj)

      const response = {

        success : true ,
        data : {
          major
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

      const major = await majorService.update(id ,modelObj)

      const response = {
        success : true ,
        data : {
          major
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

  static async createFile (req, res ) {

    try {
      const files = await Joi.validate(req.files, {
        excel: Joi.array()
          .min(1)
          .required(),
      })

      const {user} = req

      console.log(user)

      if ( user.id > 0 ) throw Error('INVALID_REQUEST')

      const response = {
        success : true 
      }
      res.send(response)
    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

  static async getFile ( req, res ) {

    try {

      const file = '../excelfile/major.xlsx'
      const mimetype = mime.gettype(file)
      const filename = path.basename(file)

      if ( !file ) throw Error('INVALID REQUEST')

      console.log("fuckman")

      res.setHeader('Content-disposition', 'attachment; filename=' + filename) // 다운받아질 파일명 설정
      res.setHeader('Content-type', mimetype)

      const filestream = fs.createReadStream(file);
      filestream.pipe(res);

    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }



}