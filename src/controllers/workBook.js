import { workBookService , noteService, studentService, workBookRecordService } from '../services'
import Joi from '@hapi/joi'

import { createErrorResponse } from '../utils/functions'
import { WorkBook } from '../models'

export default class workBookController {


  static async create ( req, res ) {

    try { 

      console.log("123")

      const result = await Joi.validate ( req.body, {

        title : Joi.string().required(),
        publisher : Joi.string().required()
      })


      const { title, publisher } = result 

      const modelObj = {
        title,
        publisher
      }
      
      await workBookService.create(modelObj)

      const response = {
        success : true 
      }
    

      res.send(response)

    } catch ( e ) {
      res.send(createErrorResponse(e))
    }


  }

  static async findList ( req, res ) {


    try {

      const result = await Joi.validate ( req.query, {
        studentId : Joi.number().optional(),
      })

      const { studentId } = result 

      var workBooks = []

      if (studentId == undefined) workBooks = await workBookService.findAll()
      else{

        workBooks = await workBookRecordService.findList({studentId})

        console.log(workBooks.length)
        workBooks = workBooks.map( workBookRecord => workBookRecord.workBook)

      } 

      const response = {
        success : true,
        data : {
          workBooks
        }
      }

      res.send(response)

       
    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

  static async findMyList( req, res ) {


    try {

      const studentId = req.params.studentId 

      var myWorkBooks = await workBookRecordService.findList({studentId})

      myWorkBooks = myWorkBooks.map ( it => it.workBook)

      const response = {
        success : true,
        data : {
          workBooks : myWorkBooks
        
        }
      }

      res.send(response)

    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

  static async buy ( req, res) {

    try {

      const result = await Joi.validate ( req.body, {
        studentId : Joi.number().required(),
        workBookId : Joi.number().required(),
        bigChapterId : Joi.number().required()
      })

      const { studentId , workBookId, bigChapterId } = result 

      const modelObj = {
        studentId,
        workBookId,
        bigChapterId 
      }

      await workBookRecordService.create (modelObj )

      const response = {
        success : true
      }

      res.send(response)

    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

  static async findOne (req,res) {

    try {

      const id = req.params.id 

      const workBook = await workBookService.findOne({id})

      if ( workBook == null ) throw Error('WORK_BOOK_NOT_FOUND')

      const response = {
        success : true,
        data : {
          workBook
        }
      }

      res.send(response)

    } catch ( e ){
      res.send(createErrorResponse(e))
    }
  }

  static async findMyChapterList( req,res) {


    try {

      const studentId = req.params.studentId 

      const result = await Joi.validate ( req.query,{
        workBookId : Joi.number().required(),

      })

      const { workBookId } = result  

      var myChapterList = await workBookRecordService.findList({
        workBookId,
        studentId
      })

      console.log(myChapterList.length)
      myChapterList = myChapterList.map( it => it.bigChapter)


      console.log(myChapterList.length)
      const response = {
        success : true,
        data : {
          bigChapters : myChapterList
        }
      }

      res.send(response)

    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

}