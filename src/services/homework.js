
import sequelize from 'sequelize'

import { Homework } from '../models'

let instance = null

class HomeworkService {
	constructor() {
		if (!instance) {
			console.log('HomeworkService 생성' + this)
			instance = this
		}
		return instance
  }


  async create ( modelObj) {

    await Homework.create(modelObj)

    const newHomework = await Homework.findOne({
      where : JSON.parse(JSON.stringify(modelObj))
    })
    
    return newHomework 


  }

  async findOne ( where ) {
    return await Homework.findOne({
			where: JSON.parse(JSON.stringify(where))
		})
  }

}