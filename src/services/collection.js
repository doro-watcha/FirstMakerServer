
import sequelize from 'sequelize'
import moment from 'moment'

import { Collection , Note } from '../models'
import Problem from '../models/Problem'
let instance = null

class CollectionService {
	constructor() {
		if (!instance) {
			console.log('CollectionService 생성' + this)
			instance = this
		}
		return instance
  }


  async create ( modelObj) {

    await Collection.create(modelObj)

    const newCollection = await Collection.findOne({
      where : JSON.parse(JSON.stringify(modelObj))
    })
    
    return newCollection 
  }

  async findList ( userId, date ) {


    const collections = await Collection.findAll({
      where: {
        createdAt: { [sequelize.Op.between]: [date,date.add(0,'days').endOf('day').format()]},
        userId
      }
    })

    return collections


  }

  async findOne ( where ) {
    return await Collection.findOne({
      where: JSON.parse(JSON.stringify(where)),
      include : {
        model : Note,
        as : 'note'
      }
		})
  }

}

export default new CollectionService()