
import Joi from '@hapi/joi'
import mime from 'mime'
import path from 'path'
import fs from 'fs'


import { createErrorResponse } from '../utils/functions'

export default class fileController {

  static async createMajor ( req, res ) {
    try {
      const files = await Joi.validate(req.files, {
        excel: Joi.array()
          .min(1)
          .required(),
      })

      //const {user} = req

      //console.log(user)

      //if ( user.id > 0 ) throw Error('INVALID_REQUEST')

      const response = {
        success : true 
      }
      res.send(response)
    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

  static async getMajor ( req, res ) {

    try {

      const file = '../file/major.xlsx'
      const mimetype = mime.getType(file)
      const filename = path.basename(file)

      if ( !file ) throw Error('INVALID REQUEST')

      res.download(file, 'major.xlsx')

    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }



}