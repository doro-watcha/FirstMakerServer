
import Joi from '@hapi/joi'
import mime from 'mime'
import path from 'path'
import fs from 'fs'
import xlsx from 'xlsx'
import { majorService, universityService , majorDataService} from '../services'

import { createErrorResponse } from '../utils/functions'

export default class fileController {

  static async createMajorFile ( req, res ) {
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

  static async parseMajor(req,res) {

    try { 

      await majorService.deleteAll()
      await majorDataService.deleteAll()


      
      const path = ('../excelfile/major.xlsx')

      let workbook = xlsx.readFile(path, {sheetRows: 5657})
      let sheetsList = workbook.SheetNames
      let sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetsList[0]], {
           header: 1,
           defval: '',
           blankrows: true
      })

      let data = []
      for ( let i = 3 ; i < 5657 ; i++) {
        let obj1 = {
          line : sheetData[i][0],
          group : sheetData[i][1],
          location : sheetData[i][2],
          univName : sheetData[i][3],
          recruitmentType : sheetData[i][4],
          recruitmentUnit : sheetData[i][5],
          majorName : sheetData[i][6]
        }

       await majorService.create(obj1)
      }

      for ( let i = 3; i < 5657; i++) {

        let obj2 = {
          year : 2020,
          majorId : i-2,
          metadata : {
            initialMember : sheetData[i][10],
            additionalMember : sheetData[i][11],
            competitionRate : sheetData[i][17],
            reflectionSubject : sheetData[i][29],
            tamguNumber : sheetData[i][31],
            applicationIndicator : sheetData[i][33],
            extraPoint: sheetData[i][69]
          },
          prediction : {
            strong : sheetData[i][23],
            safe : sheetData[i][24],
            dangerous : sheetData[i][25],
            sniping : sheetData[i][26]
          },
          ratio : {
            korean : sheetData[i][35],
            math : sheetData[i][37],
            english : sheetData[i][39],
            tamgu : sheetData[i][41],
            foreign : sheetData[i][43],
            history : sheetData[i][45]
          },
          gradeToScore : {
            english : {
              way : sheetData[i][46],
              score : sheetData[i].slice(47,56)
            },
            history : {
              way : sheetData[i][57],
              score : sheetData[i].slice(58,67)
            }
          }
        }

        
        await majorDataService.create(obj2)

        let obj3 = {
          year : 2021,
          majorId : i-2,
          metadata : {
            initialMember : sheetData[i][7],
            additionalMember : sheetData[i][8],
            competitionRate : sheetData[i][16],
            reflectionSubject : sheetData[i][28],
            tamguNumber : sheetData[i][30],
            applicationIndicator : sheetData[i][32],
            extraPoint : sheetData[i][68]
          },
          prediction : {
            strong : sheetData[i][19],
            safe : sheetData[i][20],
            dangerous : sheetData[i][21],
            sniping : sheetData[i][22]
          },
          ratio : {
            korean : sheetData[i][34],
            math : sheetData[i][36],
            english : sheetData[i][38],
            tamgu : sheetData[i][40],
            foreign : sheetData[i][42],
            history : sheetData[i][44]
          },
          // gradeToScore : {
          //   english : {
          //     way : sheetData[i][46],
          //     score : sheetData[i].splice(47,9)
          //   },
          //   history : {
          //     way : sheetData[i][48],
          //     score : sheetData[i].splice(49,9)
          //   }
          // }
        }

        await majorDataService.create(obj3)
      }




      const response = {
        success : true
        
      }

      res.send(response)
    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

  static async getMajorFile ( req, res ) {

    try {

      const file = '../excelfile/major.xlsx'


      const mimetype = mime.getType(file)
      const filename = path.basename(file)

      res.download(file, 'major.xlsx')

    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

  static async getUnivFile ( req,res) {

    try {

      const file = '../excelfile/university.xlsx'


      const mimetype = mime.getType(file)
      const filename = path.basename(file)

      res.download(file, 'university.xlsx')

    } catch ( e) {
      res.send(createErrorResponse(e))
    }
  }

  static async createUnivFile(req,res) {

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


    } catch ( e) {
      res.send(createErrorResponse(e))
    }

  }

  static async parseUniv(req,res) {

    try {

  
      await universityService.deleteAll()

      const path = ('../excelfile/university.xlsx')

      let workbook = xlsx.readFile(path, {sheetRows: 50})
      let sheetsList = workbook.SheetNames
      let sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetsList[1]], {
           header: 1,
           defval: '',
           blankrows: true
      })

      console.log(sheetData)


      let data = []
      for ( let i = 1 ; i < 43 ; i++) {
        let obj1 = {
          line : '인문',
          name : sheetData[i][0],
          group : sheetData[i][1],
          min : sheetData[i][2],
          max : sheetData[i][3]
        }
        //await universityService.create(obj1)

        data.push(obj1)
        // let obj2 = {

        //   line : '자연',
        //   name : sheetData[i][0],
        //   group : sheetData[i][4],
        //   min : sheetData[i][5],
        //   max : sheetData[i][6]
        // }

        //await universityService.create(obj2)
        //data.push(obj1)
      }

      const response = {
        success : true,
        data
      }
    
      res.send(response)

    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }


}