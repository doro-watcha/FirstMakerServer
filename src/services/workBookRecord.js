
import sequelize from 'sequelize'

import { WorkBook , Student, WorkBookRecord, BigChapter } from '../models'

let instance = null

class WorkBookRecordService {
	constructor() {
		if (!instance) {
			console.log('WorkBookRecord Service 생성' + this)
			instance = this
		}
		return instance
	}

	async create(modelObj) {
    await WorkBookRecord.create(modelObj)

    return true 
  }


	
	async findList ( where ) {

    return await WorkBookRecord.findAll({
      where : JSON.parse(JSON.stringify(where)),
      include : [{
        model : WorkBook,
        as : 'workBook'
      },
      {
        model : BigChapter,
        as : 'bigChapter'
      }
    ]
    })

  }

  async findOne ( where ) {

    return await WorkBookRecord.findOne({
      where : JSON.parse(JSON.stringify(where)),
      include : {
        model : WorkBook,
        as : 'workBook'
      }
    })
  }
  
}

export default new WorkBookRecordService()