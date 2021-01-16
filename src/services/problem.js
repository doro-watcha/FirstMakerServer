
import sequelize from 'sequelize'

import { Problem ,BigChapter, MiddleChapter,SmallChapter } from '../models'
import { randomBytes } from 'crypto'

import Sequelize from 'sequelize'
const Op = Sequelize.Op;

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
      include : [
        {
          model : BigChapter,
          as : 'bigChapter'
        },
        {
          model : MiddleChapter,
          as : 'middleChapter'
        },{
          model : SmallChapter,
          as : 'smallChapter'
        }
      ],
      limit : number,
      order : sequelize.literal('rand()')
    })

  }

  async findAdditionalList ( smallChapterId , number, duplicatedIdList) {

    return await Problem.findAll({
      where : {
        smallChapterId,
        id : {
          [Op.notIn] : duplicatedIdList
        }
      },
      include : [
        {
          model : BigChapter,
          as : 'bigChapter'
        },
        {
          model : MiddleChapter,
          as : 'middleChapter'
        },{
          model : SmallChapter,
          as : 'smallChapter'
        }
      ],
      limit : number,
      order : sequelize.literal('rand()')
    })
  }


  async findOne ( where ) {

    return await Problem.findOne({
      where : JSON.parse(JSON.stringify(where)),
      include : [
        {
          model : BigChapter,
          as : 'bigChapter'
        },
        {
          model : MiddleChapter,
          as : 'middleChapter'
        },{
          model : SmallChapter,
          as : 'smallChapter'
        }
      ],
    })
  }
  
}

export default new ProblemService()