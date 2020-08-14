
import Joi from '@hapi/joi'
import mime from 'mime'
import path from 'path'
import fs from 'fs'
import xlsx from 'xlsx'
import { majorService, universityService , majorDataService} from '../services'

import { createErrorResponse } from '../utils/functions'

export default class fileController {

  static async uploadMajor ( req, res ) {
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

  static async donwloadMajor ( req, res ) {

    try {

      const file = '../excelfile/major.xlsx'


      const mimetype = mime.getType(file)
      const filename = path.basename(file)

      res.download(file, 'major.xlsx')

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
      for ( let i = 3 ; i < 100 ; i++) {

        /**
         * 앞부분만 떼가지고 Major를 하나 만들어준다 ( 이거는 연도에 상관없는 metadata이므로 major로 구분 )
         */
        let obj1 = {
          id : i-2,
          line : sheetData[i][0], // 인문 
          group : sheetData[i][1], // 다 
          location : sheetData[i][2], // 경남
          univName : sheetData[i][3], // 가야대 
          recruitmentType : sheetData[i][4], // 일반학생
          recruitmentUnit : sheetData[i][5], // 경찰행정학과 
          majorName : sheetData[i][6] // 경찰행정학과 
        }

       await majorService.create(obj1)
      }

      for ( let i = 3; i < 100; i++) {


        let korean_ratio = sheetData[i][35]
        let math_ratio = sheetData[i][37]
        let english_ratio = sheetData[i][39]
        let tamgu_ratio = sheetData[i][41]
        let history_ratio = sheetData[i][45]

        let parsed_data = {
          korean : 0, english : 0 ,math_ga : 0, math_na : 0, tamgu_society : 0 , tamgu_science : 0, history : 0
        }
        if ( korean_ratio.length > 0 ) {
          parsed_data.korean = korean_ratio.replace(/[^0-9]/g,'')
        }
        if ( english_ratio.length > 0 ) {
          parsed_data.english = english_ratio.replace(/[^0-9]/g,'')
        }

        if ( history_ratio.length > 0 ) {
          parsed_data.history = history_ratio.replace(/[^0-9]/g,'')
        }
        // 수학 반영비율에서 가,나에 대해서 숫자만 파싱
        if ( math_ratio.indexOf('가') >= 0 ) {
          parsed_data.math_ga = math_ratio.replace(/[^0-9]/g,'')
        } 
        if ( math_ratio.indexOf('나') >= 0 ) {
          parsed_data.math_na = math_ratio.replace(/[^0-9]/g,'')
        }
        
        // 탐구 반영비율에서 사,과에 대해서 숫자만 파싱 
        if ( tamgu_ratio.indexOf('사') >= 0 ) {
          parsed_data.tamgu_society = tamgu_ratio.replace(/[^0-9]/g,'')
        }
        
        if ( tamgu_ratio.indexOf('과') >= 0 ) {
          parsed_data.tamgu_science = tamgu_ratio.replace(/[^0-9]/g,'')
        }



        let obj2 = {
          id : 2 * i - 5,
          year : 2020,
          majorId : i-2,
          metadata : {
            initialMember : sheetData[i][10], // 1
            additionalMember : sheetData[i][11], // 14
            competitionRate : sheetData[i][17], // 2.33
            reflectionSubject : sheetData[i][29], // 탐,한+국,수,영중 택2
            tamguNumber : sheetData[i][31], // 1 
            applicationIndicator : sheetData[i][33], // 백분위 
            extraPoint: sheetData[i][69], // 특정 영역 가산 
            perfectScore : sheetData[i][74] // 총 만점 
          },
          prediction : {
            strong : sheetData[i][23], 
            safe : sheetData[i][24],
            dangerous : sheetData[i][25],
            sniping : sheetData[i][26]
          },

          ratio : {
            korean : parsed_data.korean, // (40)
            math : {
              ga : parsed_data.math_ga,
              na : parsed_data.math_na
            }, // 수가나 (40)
            english : parsed_data.english, // (40)
            tamgu : {
              society : parsed_data.tamgu_society,
              science : parsed_data.tamgu_science
            }, // 사과직 10 
            foreign : sheetData[i][43],
            history : parsed_data.history // 10 
          },
          gradeToScore : {
            english : {
              way : sheetData[i][46], // 수능비율포함 
              score : sheetData[i].slice(47,56)
            },
            history : {
              way : sheetData[i][57], // 수능비율포함
              score : sheetData[i].slice(58,67)
            }
          }
        }

        
        await majorDataService.create(obj2)
      }

      for ( let i = 3; i < 100 ; i++) { 

        let obj3 = {
          id : 2 * i - 4,
          year : 2021,
          majorId : i-2,
          metadata : {
            initialMember : sheetData[i][7],
            additionalMember : sheetData[i][8],
            competitionRate : sheetData[i][16],
            reflectionSubject : sheetData[i][28],
            tamguNumber : sheetData[i][30],
            applicationIndicator : sheetData[i][32],
            extraPoint : sheetData[i][68],
            perfectScore : sheetData[i][74]
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

        //await majorDataService.create(obj3)
      }




      const response = {
        success : true
        
      }

      res.send(response)
    } catch ( e ) {
      res.send(createErrorResponse(e))
    }
  }

  static async uploadUniv(req,res) {

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


  static async downloadUniv ( req,res) {

    try {

      const file = '../excelfile/university.xlsx'


      const mimetype = mime.getType(file)
      const filename = path.basename(file)

      res.download(file, 'university.xlsx')

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

      let data = []
      for ( let i = 1 ; i < 43 ; i++) {
        let obj1 = {
          id : i,
          line : '인문',
          name : sheetData[i][0],
          group : sheetData[i][1],
          min : sheetData[i][2],
          max : sheetData[i][3]
        }
        await universityService.create(obj1)

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