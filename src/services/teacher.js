import moment from 'moment-timezone'
import sequelize from 'sequelize'

import { Teacher} from '../models'

let instance = null

class TeacherService {
	constructor() {
		if (!instance) {
			console.log('TeacherService 생성' + this)
			instance = this
		}
		return instance
  }

  async create ( modelObj) {
    return await Teacher.create(modelObj)
	}
	
	async findList ( where ) {

    return await Teacher.findAll({
      where : JSON.parse(JSON.stringify(where))
    })

  }

  async findOne ( where ) {

    return await Teacher.findOne({
      where : JSON.parse(JSON.stringify(where))
    })
  }
  
  
}

export default new TeacherService()