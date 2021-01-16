
import sequelize from 'sequelize'

import { Subject,BigChapter } from '../models'

let instance = null

class SubjectService {
	constructor() {
		if (!instance) {
			console.log('SubjectService 생성' + this)
			instance = this
		}
		return instance
  }
  
  async create ( modelObj ) {

    await Subject.create(modelObj)

    const newSubject = await Subject.findOne({ 
      where : {
        name : modelObj.name 
      }
    })


		if ( newSubject == null ) throw Error('SUBJECT_NOT_FOUND')
		else {
			return newSubject
		}

    
  }

	async findList(where) {

    return await Subject.findAll({
      include : {
        model: BigChapter,
					as: 'bigChapter',
      }
		})

  }

  async findOne(where) {
    return await Subject.findOne({
      where : JSON.parse(JSON.stringify(where))
    })
  }

}

export default new SubjectService()