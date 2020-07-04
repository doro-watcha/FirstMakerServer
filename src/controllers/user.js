import { userService } from '../services'
import Joi from '@hapi/joi'

import { createErrorResponse } from '../utils/functions'

export default class userController {


    static async findUser ( req, res ) {

        try {
            const id = req.params.id 

            const user = await userService.findById(id)

            if (user == null) throw Error('USER_NOT_FOUND')   

            const response = {

                success : true ,
                data : {
                  user
                }
            }
            res.send(response)

        } catch ( e) {
            res.send ( createErrorResponse(e))
        }

    }


    static async updateUser ( req, res ) {

        try {

          const id = req.params.id

          const result = await Joi.validate ( req.body , {
            name : Joi.string(),
            highSchool : Joi.string(),
            line : Joi.string(),
            graduateYear : Joi.number(),
            predictTimes : Joi.number(),
            gender : Joi.string()
          })

          const { name , highSchool , line, graduateYear , gender } = result 


          const modelObj = {
            name : name, 
            highSchool : highSchool,
            line : line ,
            graduateYear : graduateYear,
            gender : gender 
          }

          const user = await userService.update(id, modelObj )

          const response = {
            success : true ,
            data : {
              user 
            }
          }

          res.send (response)
        } catch ( e ) {
            res.send( createErrorResponse(e))
        }



    }

    static async deleteUser ( req, res ) {

        try {

            const id = req.params.id 

            await userService.delete(id)

            const response = {
                success : true 
            }

            res.send(response)


        } catch ( e) {
            res.send(createErrorResponse(e))
        }


    }
}

