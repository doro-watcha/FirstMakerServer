
import sequelize from 'sequelize'

import { MiddleChapter, SmallChapter } from '../models'

let instance = null

class MiddleChapterService {
	constructor() {
		if (!instance) {
			console.log('MiddleChapterService 생성' + this)
			instance = this
		}
		return instance
  }


  async create ( modelObj) {

    await MiddleChapter.create(modelObj)

    const newMiddleChapter = await MiddleChapter.findOne({
      where : {
        name : modelObj.name 
      }
    })

    if ( newMiddleChapter == null ) throw Error('MIDDLE_CHAPTER_NOT_FOUND')
		else {
			return newMiddleChapter
		}

  }

  async findList ( where ) {

    return await MiddleChapter.findAll({
      where: JSON.parse(JSON.stringify(where)),
      include : {
        model : SmallChapter,
        as : 'smallChapter'
      }
    })

  }

  async findOne ( where ) {

    return await MiddleChapter.findOne({
      where : JSON.parse(JSON.stringify(where))
    })
  }
  
}

export default new MiddleChapterService()