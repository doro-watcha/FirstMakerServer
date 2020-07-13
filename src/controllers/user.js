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

    static async searchUser(req,res) {

      try {

        const result = await Joi.validate ( req.query , {
          academyId : Joi.number()
        })

        const { academyId } = result 

        const where = {
          academyId
        }

        const user = await userService.findAll(where)

        const response = {
          success : true ,
          data : {
            user 
          }
        }

        res.send(response)


      } catch ( e) {
        res.send(createErrorResponse(e))
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
            gender : Joi.string(),
            haknyeon : Joi.string(),
            academyId : Joi.number(),
            adminLevel : Joi.number()
          })

          const { name , highSchool , line, graduateYear , gender , haknyeon, academyId, adminLevel } = result 


          const modelObj = {
            name,
            highSchool,
            line,
            graduateYear,
            gender,
            haknyeon,
            academyId,
            adminLevel
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

