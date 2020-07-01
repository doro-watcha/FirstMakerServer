import { scoreService } from '../services'
import Joi from '@hapi/joi'

import { createErrorResponse } from '../utils/functions'

export default class scoreController {

    static async createScore ( req, res ) {

        try {

            const result = await Joi.validate(req.body, {
                korean : Joi.object().required(),
                math : Joi.object().required(),
                english : Joi.object().required(),
                tamgu1 : Joi.object().required(),
                tamgu2 : Joi.object().required(),
                history : Joi.object().required(),
                type : Joi.string().required()
            })
            
            const { korean , math , english , tamgu1, tamgu2 , history , type } = result 

            const { user } = req

            const modelObj = {
                userId : user.id,
                korean_score : korean.score,
                korean_grade : korean.grade,
                korean_percentile : korean.percentile,
                english_grade : english.grade,
                math_score : math.score,
                math_grade : math.grade,
                math_percentile : math.percentile,
                tamgu1_score : tamgu1.score,
                tamgu1_grade : tamgu1.grade,
                tamgu1_percentile : tamgu1.percentile,
                tamgu2_score : tamgu2.score,
                tamgu2_grade : tamgu2.grade,
                tamgu2_percentile : tamgu2.percentile,
                history_grade : history.grade,
                type : type
                
            }
            const score = await scoreService.create( modelObj )

            const response = {

                success : true,
                data : {
                    score 
                }
            }
            res.send(response)

        } catch (e) {
            res.send ( createErrorResponse(e))
        }


    }
    static async findScore ( req, res ) {

        try {
            const userId = req.params.userId 

            const score = await scoreService.findByUserId(userId)

            if (score == null) throw Error('SCORE_NOT_FOUND')   

            const response = {

                success : true ,
                data : {
                    korean : {
                        score : score.korean_score,
                        grade : score.korean_grade,
                        percentile : score.korean_percentile
                    },
                    english : {
                        grade : score.english_grade
                    },
                    math : {
                        score : score.math_score,
                        grade : score.math_grade,
                        percentile : score.math_percentile
                    },
                    tamgu1 : {
                        score : score.tamgu1_score,
                        grade : score.tamgu1_grade,
                        percentile : score.tamgu1_percentile
                    },
                    tamgu2 : {
                        score : score.tamgu2_score,
                        grade : score.tamgu2_grade,
                        percentile : score.tamgu2_percentile
                    },
                    history : {
                        history : score.history_grade
                    }

                }
            }
            res.send(response)

        } catch ( e) {
            res.send ( createErrorResponse(e))
        }

    }


    static async updateScore ( req, res ) {

        try {
            const userId = req.params.userId

            const result = await Joi.validate(req.body, {
                korean : Joi.object(),
                math : Joi.object(),
                english : Joi.object(),
                tamgu1 : Joi.object(),
                tamgu2 : Joi.object(),
                history : Joi.object(),
                type : Joi.string()
            })

            const { korean, math , english ,tamgu1, tamgu2, history, type } = result

            
            const modelObj = {
                userId : userId,
                korean_score : korean.score,
                korean_grade : korean.grade,
                korean_percentile : korean.percentile,
                english_grade : english.grade,
                math_score : math.score,
                math_grade : math.grade,
                math_percentile : math.percentile,
                tamgu1_score : tamgu1.score,
                tamgu1_grade : tamgu1.grade,
                tamgu1_percentile : tamgu1.percentile,
                tamgu2_score : tamgu2.score,
                tamgu2_grade : tamgu2.grade,
                tamgu2_percentile : tamgu2.percentile,
                history_grade : history.grade,
                type : type
                
            }

            const score = await scoreService.updateById(userId, modelObj)

            if ( score == null ) throw Error('SCORE_NOT_FOUND')

            const response = {
                success : true,
                data : {
                    score : score 
                }
            }

            res.send(response)


        } catch ( e ) {

            res.send( createErrorResponse(e))
        }



    }

    static async deleteScore ( req, res ) {

        try {

            const userId = req.params.userId 

            await scoreService.deleteById(userId)

            const response = {
                success : true 
            }

            res.send(response)


        } catch ( e) {
            res.send(createErrorResponse(e))
        }


    }
}

