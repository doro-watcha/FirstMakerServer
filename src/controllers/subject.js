import { subjectService } from '../services'
import Joi from '@hapi/joi'

import { createErrorResponse } from '../utils/functions'

export default class subjectController {

  static async create ( req,res) {

    try {

      const result = await Joi.validate ( req.body , {
        name : Joi.string().required(),
      })

      const { name } = result

      const modelObj = {
        name 
      }
			const oldSubject = await subjectService.findOne({
				name
      })
      
      if ( oldSubject) throw Error('SUBJECT_ALREADY_EXISTS')
      

      const subject = await subjectService.create(modelObj)

    
      const response = {
        success : true,
        data : {
          subject
        }
      }

      res.send(response)


    }

    catch ( e) {
      res.send(createErrorResponse(e))
    }
  }



  static async findList(req,res) {

    try {

      
      const where = {
    
      }

      const subjects = await subjectService.findList(where)

      const response = {
        success : true ,
        data : {
          subjects
        }
      }

      res.send(response)


    } catch ( e ) {
      res.send(createErrorResponse(e))
    }

  }
}

