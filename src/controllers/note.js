import { noteService , homeworkService, workPaperService, examService} from '../services'
import Joi from '@hapi/joi'

import { createErrorResponse } from '../utils/functions'
import Note from '../models/Note'
import Sequelize from 'sequelize'
const Op = Sequelize.Op;

export default class noteController {


  static async create ( req, res ) {

    try { 

      const result = await Joi.validate ( req.body, {
        collectionId : Joi.numbeer().required(),
        problemId : Joi.number().required(),

      })

      const { collectionId, problemId } = result 


      const modelObj = {
        problemId,
        collectionId
      }

      const newNote = await noteService.create(modelObj)

      const response = {

        success : true ,
        data : {
          note : newNote 
        }
      }

      res.send(response)

    } catch ( e) {
      res.send(createErrorResponse(e))
    }
  }

  static async findList ( req, res) {


    try {

      const result = await Joi.validate( req.query, {
        startDate : Joi.string().optional(),
        endDate : Joi.string().optional()
      })

      const {  startDate, endDate  } = result 

      var notes = []

      const { user } = req
      
      if ( startDate !== undefined ) {
        notes = await noteService.findWeeklyList(user.id, startDate, endDate)

        console.log(notes.map(it => it.updatedAt))
        notes = notes.filter( note => 
          note.status === "맞음" || note.status === "틀림"
        )

        console.log(notes.length)
      }
      else notes = await noteService.findList({userId : user.id})



      const response = {
        success : true,
        data : {
          notes 
        }
      }


      res.send(response)


    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

  static async findOne ( req, res) {


    try { 

      const id = req.params.id 

      const note = await noteService.findOne({id})

      if ( note == null ) throw Error('NOTE_NOT_FOUND')

      const response = {
        success : true ,
        data : {
          note
        } 
      }

      res.send(response)


    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

  static async update ( req, res) {

    try {

      const result = await Joi.validate( req.body, {
        submitList : Joi.array().required(),
        noteIdList : Joi.array().required(),
        spendingTimeList : Joi.array().required(),
        greenStarClickedList : Joi.array().required(),
        wholeTime : Joi.number().required(),
        type : Joi.string().required(),
        id : Joi.number().required()
      })

      const { submitList , noteIdList, spendingTimeList , greenStarClickedList, type , id ,wholeTime } = result 

      if ( submitList.length !== noteIdList.length ) throw Error('SCORING_NOT_FOUND')

      var notes = []
      var correct = 0
    
      var unConfirmed = 0
      for ( let i = 0 ; i < submitList.length ; i++){

        const note = await noteService.findOne({id : noteIdList[i]})

        var status = "틀림" 

        console.log('submitList[i]')
        console.log(submitList[i])

        if ( submitList[i] == note.problem.answer) {
          status = "맞음"
          correct++
        }
        else if ( (submitList[i] == "0" || submitList[i] == '0') && type != "시험") {
          unConfirmed++
          status = "채점안됨"
        }

        const _newNote = {
          status,
          submit : submitList[i],
          spendingTime : spendingTimeList[i],
          isGreenStar : greenStarClickedList[i]
        }

        const newNote = await noteService.update(note.id, _newNote)
        notes.push(newNote)
      }

      var collectionStatus = "완료됨"

      console.log("채점안됨갯수")
      console.log(unConfirmed)

      console.log("type")
      console.log(type)

      if ( unConfirmed > 0 && type != "시험") collectionStatus = "진행중"

      const accurateRate = ((correct / notes.length) * 100).toFixed(2)

      const collectionModel = {
        status : collectionStatus,
        accurateRate,
        spendingTime : wholeTime
      }

      if ( type === "숙제") await homeworkService.update(id,collectionModel )
      else if ( type == "시험") await examService.update(id, collectionModel)
      else if ( type == "문제지") await workPaperService.update(id, collectionModel)



      const response = {
        success : true,
        data : {
          notes,
          status : collectionStatus,
          accurateRate,
          spendingTime : wholeTime
        }
      }

      res.send(response)



    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

  static async findWrongList ( req, res ) {

    try {

      const result = await Joi.validate(req.query,{
        subject : Joi.string().required(),
        startDate : Joi.string().required(),
        endDate : Joi.string().required()
      })

      const { subject , startDate , endDate} = result 

      const { user } = req

      const wrongNotes = await noteService.findWrongList(user.id, startDate, endDate)

      wrongNotes.filter( note => {
          if ( note.problem.subject != null)note.problem.subject.name == subject
      })

      const response = {
        success : true,
        data : {
          notes : wrongNotes
        }
      }

      res.send(response)



    } catch ( e ) {
      res.send(createErrorResponse(e))
    }

  }

  static async findStarList ( req, res) {

    try {

      const result = await Joi.validate(req.query,{
        subject : Joi.string().required(),
        startDate : Joi.string().required(),
        endDate : Joi.string().required()
      })

      const { subject, startDate , endDate  } = result 

      const { user } = req
      const starNotes = await noteService.findStarList(
        user.id, startDate, endDate 
      )

      starNotes.filter( note => {
        if ( note.problem.subject != null)note.problem.subject.name == subject
      })
      const response = {
        success : true,
        data : {
          notes : starNotes
        }
      }

      res.send(response)



    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

  static async findLongList ( req,res) {

    try {

      const result = await Joi.validate(req.query,{
        subject : Joi.string().required(),
        startDate : Joi.string().required(),
        endDate : Joi.string().required()
      })

      const { subject , startDate , endDate} = result 

      const { user } = req

      const longNotes = await noteService.findLongList(user.id,startDate, endDate)
      longNotes.filter( note => {
        if ( note.problem.subject != null)note.problem.subject.name == subject
      })
      const response = {
        success : true,
        data : {
          notes : longNotes
        }
      }

      res.send(response)



    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

}