import moment from 'moment-timezone'
import sequelize from 'sequelize'

import { Student} from '../models'

let instance = null

class StudentService {
	constructor() {
		if (!instance) {
			console.log('Student Service 생성' + this)
			instance = this
		}
		return instance
  }

  async create ( modelObj) {
    return await Student.create(modelObj)
  }


  async findList ( where ) {

    return await Student.findAll({
      where : JSON.parse(JSON.stringify(where))
    })

  }

  async findOne ( where ) {

    return await Student.findOne({
      where : JSON.parse(JSON.stringify(where))
    })
  }
  
}

export default new StudentService()