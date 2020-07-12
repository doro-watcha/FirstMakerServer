import { academyService } from '../services'
import Joi from '@hapi/joi'

import { createErrorResponse } from '../utils/functions'

export default class academyController {

  static async create (req, res ) {

    try {

      const result = await Joi.validate(req.body, {
        name : Joi.string().required(),
        password : Joi.string().required()
      })

      const { name , password } = result 

      const modelObj = {
        name,
        password
      }

      			// check if user already exists
			const academy = await academyService.findOne({
				name
			})

			// [ERROR] USER_ALREADY_EXISTS
			if (academy) throw Error('ACADEMY_ALREADY_EXISTS')

			// create user
			const success = await academyService.create(modelObj)

			// create response
			const response = {
				success: true,
			}

			res.send(response)

    } catch ( e ) {

      res.send(createErrorResponse(e))
    }
  }

  static async findAll ( req, res) {
    try { 

      const academy = await academyService.findAll({})

      const response = {
        success : true ,
        data : {
          academy 
        }
      }

      res.send(response)

    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

  static async findOne( req,res ) {
    try {

      const id = req.params.id

      const academy = await academyService.findOne({
        id
      })

      if ( academy == null) throw Error('ACADEMY_NOT_FOUND')

      const response = {
        success : true ,
        data : {
          academy 
        }
      }

      res.send(response)

    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }


  static async update (req, res) {
    try {

      const id = req.params.id

      const result = await Joi.validate (req.body, {
        name : Joi.string()
      })

      const { name } = result 

      const modelObj = {
        name
      }

      const academy = await academyService.update(id, modelObj)

      const response = {
        success : true ,
        data : {
          academy 
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
      
      await academyService.delete(id)

      const response = {
        success : true 
      }

      res.send(response)

       
    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

}