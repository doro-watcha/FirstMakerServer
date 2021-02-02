
import sequelize from 'sequelize'

import { SmallChapter } from '../models'

let instance = null

class SmallChapterService {
	constructor() {
		if (!instance) {
			console.log('SmallChapterService 생성' + this)
			instance = this
		}
		return instance
  }


  async create ( modelObj) {

    await SmallChapter.create(modelObj)

    const newSmallChapter = await SmallChapter.findOne({
      where : {
        name : modelObj.name 
      }
    })

    if ( newSmallChapter == null ) throw Error('SMALL_CHAPTER_NOT_FOUND')
		else {
			return newSmallChapter
		}

  }

  async findList ( where ) {

    return await SmallChapter.findAll({
      where: JSON.parse(JSON.stringify(where))
    })

  }

  async findOne ( where ) {

    return await SmallChapter.findOne({
      where : JSON.parse(JSON.stringify(where))
    })
  }

  async delete ( id ) {



    return await SmallCHapter.destroy({
      where : {
        id
      }
    })
  }
  
}

export default new SmallChapterService()