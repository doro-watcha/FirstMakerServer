
import sequelize from 'sequelize'

import { Problem, BlackList } from '../models'

let instance = null

class BlackListService {
	constructor() {
		if (!instance) {
			console.log('BlackListService 생성' + this)
			instance = this
		}
		return instance
  }


  async create ( modelObj) {

    await BlackList.create(modelObj)

    const newBlackList = await BlackList.findOne({
      where : modelObj
    })

    if ( newBlackList == null ) throw Error('BlACK_LIST_NOT_FOUND')
		else {
			return newBlackList
		}

  }

  async findList ( where ) {

    return await BlackList.findAll({
      where: JSON.parse(JSON.stringify(where))
    })

  }

  async findOne ( where ) {

    return await BlackList.findOne({
      where : JSON.parse(JSON.stringify(where))
    })
  }
  
}

export default new BlackListService()