import { collectionService , noteService } from '../services'
import Joi from '@hapi/joi'
import moment from 'moment'

import { createErrorResponse } from '../utils/functions'

export default class collectionController {

  static async create ( req, res ) {

    try { 

      const { user } = req 

      const result = await Joi.validate ( req.body, {
        type : Joi.string().required(),
        title : Joi.string().required(),
        problemIdList : Joi.array().required(),
        timeLimit : Joi.number().optional(),
      })

      const { type ,title , problemIdList, timeLimit  } = result 

      const modelObj = {
        type,
        timeLimit,
        title,
        userId : user.id
      }

      const collection = await collectionService.create(modelObj)

      for ( let i = 0 ; i < problemIdList.length ; i++) {

        let noteModel = {
          problemId : problemIdList[i],
          collectionId : collection.id 
        }
        await noteService.create(noteModel)
      }

      const response = {
        success : true ,
        data : {
          collection
        }
      }

      res.send(response)
    
    }
    catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }


  static async findOne ( req, res ) {

    try {

      const id = req.params.id 

      const collection = await collectionService.findOne({id})

      const response = {
        success : true,
        data : {
          collection
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

      var date = moment().format('YYYY-MM-DD HH:mm:ss')

      const collections = await collectionService.findList(user.id, date)

      const response = {
        success : true ,
        data : {
          collections
        }
      }

      res.send(response)
    }
    catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }
}
