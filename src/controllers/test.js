import { scoreService, testService, majorDataService } from '../services'
import Joi from '@hapi/joi'
import xlsx from 'xlsx'
import mime from 'mime'
import path from 'path'

import { createErrorResponse } from '../utils/functions'
import reportController from './report'

export default class testController {

  static async uploadFile ( req, res ) {

    try { 
      const files = await Joi.validate(req.files, {
        excel: Joi.array()
          .min(1)
          .required(),
      })


      const response = {
        success : true 
      }
      res.send(response)
    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

  static async downloadFile ( req, res ) {
    
    try {

      const file = '../excelfile/test.xlsx'


      const mimetype = mime.getType(file)
      const filename = path.basename(file)

      res.download(file, 'test.xlsx')

    } catch ( e ) {
      res.send(createErrorResponse(e))
    }


  }

  static async parse ( req, res ) {

    try {

      await testService.deleteAll()

      const result = await Joi.validate(req.query, {
        societyUserId : Joi.number().required(),
        scienceUserId : Joi.number().required()
      })


      const { societyUserId , scienceUserId } = result

      const user = { req }


      const path = ('../excelfile/test.xlsx')
      let workbook = xlsx.readFile(path, {sheetRows: 5603})
      let sheetsList = workbook.SheetNames

      let sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetsList[0]], {
           header: 1,
           defval: '',
           blankrows: true
      })



      const scienceScore = await scoreService.findOne({userId : scienceUserId})
      const societyScore = await scoreService.findOne({userId : societyUserId})

      let data = []

        // 파싱을 해보자 
        for ( let i = 3 ; i < 5603 ; i++) {

          console.log("123")
          const majorData = await majorDataService.findOne({id: 2*i-5})

          var value = -1
          if ( sheetData[i][0] == "인문") {
            console.log("446")
    
            value = await reportController.getScore(societyScore, majorData)
    
          } else {
            console.log("zxcv")

            value = await reportController.getScore(scienceScore, majorData)
          
          }

          console.log("zxcvzxvxzcvz")
            let obj1 = {
              id : i-2,
              line : sheetData[i][0], // 인문 
              group : sheetData[i][1], // 다 
              name : sheetData[i][2], // 대학명
              recruitmentType : sheetData[i][3], // 일반전형
              major : sheetData[i][4], // 세부전공
              total : sheetData[i][6],
              score : sheetData[i][7],
              test : value,
              result : 1
            }
            data.push(obj1)

          await testService.create(obj1)
        }

    


      const response = {
        success : true,
        data : data
        
      }

      res.send(response)




    } catch ( e ) {

    }
  }

  static async getList( req, res) {

    try {

      const list = await testService.findAll()

      const response = {
        success : true,
        data : {
          list 
        }
      }

      res.send(response)

    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

  static async test ( req, res ) {

      try {

      }

      catch ( e ) {
        res.send(createErrorResponse(e))
      }


    }
}

