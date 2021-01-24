
import sequelize from 'sequelize'

import { Exam , BigChapter, MiddleChapter, SmallChapter, Note, Problem, Teacher} from '../models'

let instance = null

class ExamService {
	constructor() {
		if (!instance) {
			console.log('Exam Service 생성' + this)
			instance = this
		}
		return instance
	}

	async create(modelObj) {
    await Exam.create(modelObj)
    
    const newExam = Exam.findOne({
      where : modelObj
    })

    return newExam
  }

  async findList ( where ) {

    return await Exam.findAll({
      where : JSON.parse(JSON.stringify(where)),
      order : [['id', 'desc']],
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

    return await Exam.findOne({
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

	async delete ( id ) {

		const Exam = await Exam.findOne({where: id})
        
    if ( Exam == null ) {
        throw Error ('EXAM_NOT_FOUND')
    } else {
        await Exam.destroy()
    }
  }
  
  async update ( id, modelObj ) {

    await Exam.update(modelObj,{
      where : { id }
    })

    const exam = await Exam.findOne({id})

    if ( exam == null ) throw Error('EXAM_NOT_FOUND')

    return exam

  }
  


}

export default new ExamService()