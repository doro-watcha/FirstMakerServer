import { reflectionRatioService, scoreService } from '../services'
import Joi from '@hapi/joi'

import { createErrorResponse } from '../utils/functions'

export default class reflectionRatioController {

  static async create ( req, res ) {

    try {

      const result = await Joi.validate (req.body, {
        metadata : Joi.object().required(),   
        ratio : Joi.object().required(),
        description : Joi.object().required(),
        minGrade : Joi.object().required(),
        extraRatio : Joi.object().required(),
        perfectScore : Joi.object().required(),
        totalScore : Joi.number().required(),
        gradeToScore : Joi.object().required(),
        univId : Joi.number().required()
      })

      /* meta data = { applicationIndicator, reflectionSubject, reflectionNumber , applyingNumber }

      */

      const { metadata, ratio , description, minGrade, extraRatio , perfectScore , totalScore , gradeToScore, univId} = result 

      const modelObj = {
        metadata,
        ratio,
        description,
        minGrade,
        extraRatio,
        perfectScore,
        totalScore,
        gradeToScore,
        univId
      }

      const reflectionRatio = await reflectionRatioService.create(modelObj)

      const response = {
        success : true ,
        data : {
          reflectionRatio
        }
      }

      res.send(response)
    } 
    catch (e) {
      res.send(createErrorResponse(e))
    }
  }

  static async findOne( req, res) {

    try {
      const id = req.params.id 

      const reflectionRatio = await reflectionRatioService.findOne(id)

      const response = {
        success : true,
        data : {
          reflectionRatio
        }
      }

      res.send(response)

    } 
    catch (e) {
      res.send(createErrorResponse(e))
    }

  }

  static async calculate ( req, res ) {

    try {

      const result = await Joi.validate(req.query,{
        univId : Joi.number().required(),
        userId : Joi.number().required()
      })

      const {univId, userId} = result 

      const reflectionRatio = await reflectionRatioService.findByUnivId(univId)

      const score = await scoreService.findByUserId(userId)

      const perfectScore = {
        "korean" : reflectionRatio.totalScore * ( reflectionRatio.ratio.korean / 100 ),
        "math" : reflectionRatio.totalScore * (reflectionRatio.ratio.math / 100 ),
        "english" : reflectionRatio.totalScore * (reflectionRatio.ratio.english / 100),
        "tamgu" : reflectionRatio.totalScore * (reflectionRatio.ratio.tamgu / 100)
      }

      const calculated = {
        "korean" : score.korean.score * ( perfectScore.korean / reflectionRatio.perfectScore.korean),

      }



      const calculatedScore = {
        "korean" : {
          "score" : calculated.korean,
          "extra" : 0,
          "perfect" : perfectScore.korean
        }


      }

      const response = {
        success : true,
        data : {
          reflectionRatio,
          score,
          calculatedScore
        }
      }
      res.send(response)
    }
    catch (e) {
      res.send(createErrorResponse(e))
    }
  }

  static async update ( req, res ) {

    try {

      const id = req.params.id 

      const result = await Joi.validate (req.body, {
        metadata : Joi.object().required(),   
        ratio : Joi.object().required(),
        description : Joi.object().required(),
        minGrade : Joi.object().required(),
        extraRatio : Joi.object().required(),
        perfectScore : Joi.object().required(),
        totalScore : Joi.number().required(),
        gradeToScore : Joi.object().required(),
        univId : Joi.number().required()
      })

      /* meta data = { applicationIndicator, reflectionSubject, reflectionNumber , applyingNumber }

      */

      const { metadata, ratio , description, minGrade, extraRatio , perfectScore , totalScore , gradeToScore, univId} = result 

      const modelObj = {
        metadata,
        ratio,
        description,
        minGrade,
        extraRatio,
        perfectScore,
        totalScore,
        gradeToScore,
        univId
      }

      const reflectionRatio = await reflectionRatioService.update(id ,modelObj)

      const response = {
        success : true ,
        data : {
          reflectionRatio
        }
      }

      res.send(response)

    }
    catch (e) {
      res.send(createErrorResponse(e))
    }
  }

  static async delete ( req, res) {

    try {

      const id = req.params.id

      await reflectionRatioService.delete(id)

      const response = {
        success : true
      }

      res.send(response)


    } 
    catch (e) {
      res.send(createErrorResponse(e))
    }
  }


}
  