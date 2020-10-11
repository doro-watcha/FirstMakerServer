
import sequelize from 'sequelize'

import { Problem } from '../models'
import { randomBytes } from 'crypto'

let instance = null

class ProblemService {
	constructor() {
		if (!instance) {
			console.log('ProblemService 생성' + this)
			instance = this
		}
		return instance
  }


  async create ( modelObj) {

    return await Problem.create(modelObj)

  }

  async findList ( smallChapterId , number  ) {

    return await Problem.findAll({
      where: {
        smallChapterId
      },
      limit : number,
      order : sequelize.literal('rand()')
    })

  }

  async findOne ( where ) {

    return await Problem.findOne({
      where : JSON.parse(JSON.stringify(where))
    })
  }
  
}

export default new ProblemService()