import { universityService } from '../services'
import Joi from '@hapi/joi'

import { createErrorResponse } from '../utils/functions'

export default class UniversityController {

    static async createUniversity ( req, res) {

        const result = await Joi.validate(req.body , {
            name : Joi.string().required(),
            min : Joi.number().required(),
            max : Joi.number().required(),
            location : Joi.string().required(),
            group : Joi.string().required()
        })

        const { name , min , max , location, group } = result 

        const modelObj = {
            name,
            min,
            max,
            location,
            group
        }

        const university = await universityService.create(modelObj)

        const response = {

            success : true,
            data : {
                university 
            }
        }
        
        res.send(response)

    }



    static async findList( req, res) {

        try {

            const university = await universityService.findAll()

            if ( university == null ) throw Error('UNIVERSITY NOT FOUND')

            const response = {

                success : true,
                data : {
                    university
                }
            }

            res.send(response)


        } catch ( e ) {
            res.send(createErrorResponse(e))
        }

    }


    static async updateUniversity ( req, res ) {

        try { 
            const id = req.params.id 

            const result = await Joi.validate ( req.body , {

                name : Joi.string(),
                max : Joi.number(),
                min : Joi.number(),
                location : Joi.string()
            })

            const { name , max , min , location } = result

            const modelObj = {
                name : name ,
                max : max ,
                min : min ,
                location : location 
            }

           
            await universityService.update( id , modelObj) 

            const response = {
                success : true
            }

            res.send(response)
        } catch ( e ) {
            res.send(createErrorResponse(e))
        }

    }

    static async deleteUniversity ( req, res ) {

        try { 

            const id = req.params.id

            await universityService.delete(id)

            const response = {
                success : true 
            }
            res.send(response)
        } catch ( e ) {
            res.send(createErrorResponse(e))
        }



    }
}