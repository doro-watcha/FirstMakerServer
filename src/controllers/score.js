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
                foreign : Joi.object().required(),
                line : Joi.string().required(),
                naesin : Joi.number(),
                naesin_type : Joi.string()
            })
            
            const { korean , math , english , tamgu1, tamgu2 , history ,foreign, line, naesin, naesin_type } = result 

            const { user } = req

            const modelObj = {
                userId : user.id,
                korean,
                math,
                english,
                tamgu1,
                tamgu2,
                history,
                foreign,
                line,
                naesin,
                naesin_type
            }

            const exist_score = scoreService.findByUserId(user.id)

            if ( exist_score != null) throw Error('SCORE_ALREADY_EXISTS')
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
                    score
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
                korean : Joi.object().required(),
                math : Joi.object().required(),
                english : Joi.object().required(),
                tamgu1 : Joi.object().required(),
                tamgu2 : Joi.object().required(),
                history : Joi.object().required(),
                foreign : Joi.object().required(),
                line : Joi.string().required(),
                naesin : Joi.number(),
                naesin_type : Joi.string()
            })
            
            const { korean , math , english , tamgu1, tamgu2 , history ,foreign, line, naesin, naesin_type } = result 

            const modelObj = {
                userId,
                korean,
                math,
                english,
                tamgu1,
                tamgu2,
                history,
                foreign,
                line,
                naesin,
                naesin_type
            }

            const score = await scoreService.update(userId, modelObj)

            if ( score == null ) throw Error('SCORE_NOT_FOUND')

            const response = {
                success : true,
                data : {
                    score
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

            await scoreService.delete(userId)

            const response = {
                success : true 
            }

            res.send(response)


        } catch ( e) {
            res.send(createErrorResponse(e))
        }


    }
}

