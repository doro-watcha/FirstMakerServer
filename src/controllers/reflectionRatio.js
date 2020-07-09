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

      const exist_reflection_ratio = await reflectionRatioService.findByUnivId(univId)

      if ( exist_reflection_ratio != null ) throw Error('REFLECTION_RATIO_ALREADY_EXISTS')

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

      const new_english = reflectionRatio.gradeToScore.english[score.english.grade-1]


    
      const new_tamgu = score.tamgu1.score + score.tamgu2.score
      if ( reflectionRatio.metadata.isForeignIncluded == true ) {
        if ( score.foreign.score > score.tamgu1.score ) {
          if ( score.tamgu1.score >= score.tamgu2.score) 
            new_tamgu = score.foreign.score + score.tamgu1.score
          else 
            new_tamgu = score.foreign.score + score.tamgu2.score
        }
        else if ( score.foreign.score > score.tamgu2.score ) {
          if ( score.tamgu1.score >= score.tamgu2.score ) 
            new_tamgu = score.foreign.score + score.tamgu1.score
          else 
            new_tamgu = score.foreign.score + score.tamgu2.score
        } 
      }


      const calculated = {
        "korean" : score.korean.score * ( perfectScore.korean / reflectionRatio.perfectScore.korean),
        "math" : score.math.score * ( perfectScore.math / reflectionRatio.perfectScore.math),
        "english" : new_english * (perfectScore.english / reflectionRatio.perfectScore.english),
        "tamgu" : new_tamgu * (perfectScore.tamgu / reflectionRatio.perfectScore.tamgu)
      }

      const tamgu_extra = score.tamgu1.score * ( reflectionRatio.extraRatio.tamgu[score.tamgu1.name] / 100 ) + score.tamgu2.score * (reflectionRatio.extraRatio.tamgu[score.tamgu2.name] / 100 )
      
      const extra = {
        "korean" : calculated.korean * (reflectionRatio.extraRatio.korean / 100 ),
        "math" : calculated.math * (reflectionRatio.extraRatio.math[score.math.type] / 100 ),
        "english" : calculated.english * (reflectionRatio.extraRatio.english / 100 ),
        "tamgu" : tamgu_extra,
        "history" : reflectionRatio.gradeToScore.history[score.history.grade-1],
        "foreign" : score.fo
      }

      // 표+백 일경우에 재껴줘야함

      if ( reflectionRatio.metadata.applicationIndicator == "표+백") {
        console.log("fuckman~")
      }

      // 영어가 가감일경우에도 처리해줘야함

      



      const calculatedScore = {
        "korean" : {
          "score" : calculated.korean,
          "extra" : extra.korean,
          "perfect" : perfectScore.korean
        },
        "math" : {
          "score" : calculated.math,
          "extra" : extra.math,
          "perfect" : perfectScore.math
        },
        "english" : {
          "score" : calculated.english,
          "extra" : extra.english,
          "perfect" : perfectScore.english
        },
        "tamgu" : {
          "score" : calculated.tamgu,
          "extra" : extra.tamgu,
          "perfect" : perfectScore.tamgu
        },
        "history" : {
          "extra" : extra.history 
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
  