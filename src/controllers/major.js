import { majorService, universityService } from '../services'
import Joi from '@hapi/joi'
import mime from 'mime'
import path from 'path'
import fs from 'fs'


import { createErrorResponse } from '../utils/functions'

export default class majorController {

  static async create ( req, res ) {

    try {

      const result = await Joi.validate ( req,body , {
        line : Joi.string().required(),
        group : Joi.string().required(),
        location : Joi.string().required(),
        recruitmentType : Joi.string().required(),
        univName : Joi.string().required(),
        recruitmentUnit : Joi.string().required(),
        majorName : Joi.string().required()
      })

      const { line , group , location, recruitmentType, univName, recruitmentUnit , majorName } = result 

      const modelObj = {
        line,
        group,
        location,
        recruitmentType,
        univName,
        recruitmentUnit,
        majorName
      }

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

  

  static async findList(req,res) {

    try { 
      const result = await Joi.validate ( req.query , {
        line : Joi.string(),
        group : Joi.string(),
        location : Joi.string(),
        recruitmentType : Joi.string(),
        univName : Joi.string(),
        recruitmentUnit : Joi.string(),
        majorName : Joi.string()
      })

      const { line , group , location, recruitmentType, univName, recruitmentUnit , majorName } = result 

      const modelObj = {
        line,
        group,
        location,
        recruitmentType,
        univName,
        recruitmentUnit,
        majorName
      }

    
      const majors = await majorService.findList(modelObj)

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
  
  static async findOne ( req,res) {

    try {

      const id = req.params.id

      const major = await majorService.findOne({id})

      const response = {
        success : true,
        data : {
          major
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

      const result = await Joi.validate ( req,body , {
        line : Joi.string(),
        group : Joi.string(),
        location : Joi.string(),
        recruitmentType : Joi.string(),
        univName : Joi.string(),
        recruitmentUnit : Joi.string(),
        majorName : Joi.string()
      })

      const { line , group , location, recruitmentType, univName, recruitmentUnit , majorName } = result 

      const modelObj = {
        line,
        group,
        location,
        recruitmentType,
        univName,
        recruitmentUnit,
        majorName
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

  static async delete ( req, res ) {

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