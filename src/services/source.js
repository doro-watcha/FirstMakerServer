import moment from 'moment-timezone'
import sequelize from 'sequelize'

import { Source} from '../models'

let instance = null

class SourceService {
	constructor() {
		if (!instance) {
			console.log('Source Service 생성' + this)
			instance = this
		}
		return instance
  }

  async create ( modelObj) {
    return await Source.create(modelObj)
  }


  async findList ( where ) {

    return await Source.findAll({
      where : JSON.parse(JSON.stringify(where))
    })

  }

  async findAll () {
    return  await Source.findAll()
  }

}
export default new SourceService()