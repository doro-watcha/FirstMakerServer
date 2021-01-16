
import sequelize from 'sequelize'

import { Homework ,Note , Problem, BigChapter, MiddleChapter, SmallChapter, Teacher} from '../models'

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


  async findList ( where ) {

    return await Homework.findAll({
      where : JSON.parse(JSON.stringify(where)),
      include :[
        {
            model: Note,
            as : 'note',
            include : [
                {
                    model : Problem,
                    as : 'problem',
                    include : [
                      {
                        model : BigChapter,
                        as : 'bigChapter'
                      },
                      {
                        model : MiddleChapter,
                        as : 'middleChapter'
                      },
                      {
                        model : SmallChapter,
                        as : 'smallChapter'
                      }
                    ]
                },
  
            ]
        },
        {
          model : Teacher,
          as : 'teacher'
        }
      ]
    })
  }

  async findOne ( where ) {

    return await Homework.findOne({
      where : JSON.parse(JSON.stringify(where)),
      include :[
        {
            model: Note,
            as : 'note',
            include : [
                {
                    model : Problem,
                    as : 'problem',
                    include : [
                      {
                        model : BigChapter,
                        as : 'bigChapter'
                      },
                      {
                        model : MiddleChapter,
                        as : 'middleChapter'
                      },
                      {
                        model : SmallChapter,
                        as : 'smallChapter'
                      }
                    ]
                },

            ]
        },
        {
          model : Teacher,
          as : 'teacher'
        }
      ]
    })
  }

  async update ( id, modelObj ) {

    await Homework.update(modelObj,{
      where : { id }
    })

    const homework = await Homework.findOne({id})

    if ( homework == null ) throw Error('HOMEWORK_NOT_FOUND')

    return homework

  }


}

export default new HomeworkService()