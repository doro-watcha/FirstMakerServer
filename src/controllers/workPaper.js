import { workPaperService , noteService, studentService } from '../services'
import Joi from '@hapi/joi'

import { createErrorResponse } from '../utils/functions'
import { WorkPaper } from '../models'

export default class workPaperController {


  static async create ( req, res ) {

    try { 

      const result = await Joi.validate ( req.body, {

        problemIdList : Joi.array().required(),
        title : Joi.string().required(),
        numChapters : Joi.number().required(),
        mainChapter : Joi.string().required()

      })

      const { user } = req

      const { problemIdList ,title, numChapters , mainChapter} = result 

      const modelObj = {
        title,
        userId : user.id,
        numChapters,
        mainChapter
      }

      const newWorkPaper = await workPaperService.create(modelObj)
    
      for ( var i = 0 ; i < problemIdList.length; i++) {

        const modelObj = {
          problemId : problemIdList[i],
          workPaperId : newWorkPaper.id,
          userId : user.id
        }

        await noteService.create(modelObj)
      }

      const response = {
        success : true 
      }

      res.send(response)


    } catch ( e ) {
      res.send(createErrorResponse(e))
    }

  }

  static async findOne(req ,res) {

    try {

      const id = req.params.id

      const workPaper = await workPaperService.findOne({id})

      const response = {
        success : true,
        data : {
          workPaper
        }
      }
      
      res.send(response)


    } catch ( e ){
      res.send(createErrorResponse(e))
    }
  }

  static async findList(req ,res) {

    try {

      const { user } = req


      const workPapers = await workPaperService.findList({userId : user.id})

      const response = {
        success : true,
        data : {
          workPapers
        }
      }

      res.send(response)


    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

  static async delete ( req,res) {

    try {

      const id = req.params.id 

      await workPaperService.delete(id)

      const response = {
        success : true
      }

      res.send(response)

    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

}