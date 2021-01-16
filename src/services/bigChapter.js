
import sequelize from 'sequelize'

import { BigChapter, SmallChapter, MiddleChapter } from '../models'

let instance = null

class BigChapterService {
	constructor() {
		if (!instance) {
			console.log('BigChapterService 생성' + this)
			instance = this
		}
		return instance
  }


  async create ( modelObj) {

    await BigChapter.create(modelObj)

    const newBigChapter = await BigChapter.findOne({
      where : {
        name : modelObj.name 
      }
    })

    if ( newBigChapter == null ) throw Error('BIG_CHAPTER_NOT_FOUND')
		else {
			return newBigChapter
		}

  }

  async findList ( where ) {

    return await BigChapter.findAll({
      where: JSON.parse(JSON.stringify(where)),
      include : {
        model : MiddleChapter,
        as : 'middleChapter',
        include: {
          model : SmallChapter,
          as : 'smallChapter'
        }
      }
    })

  }

  async findOne ( where ) {

    return await BigChapter.findOne({
      where : JSON.parse(JSON.stringify(where))
    })
  }
  
}

export default new BigChapterService()