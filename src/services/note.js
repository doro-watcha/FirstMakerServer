
import sequelize from 'sequelize'

import { Note , Problem, BigChapter, MiddleChapter,SmallChapter, Subject} from '../models'
import { randomBytes } from 'crypto'

import Sequelize from 'sequelize'
const Op = Sequelize.Op;
let instance = null

class NoteService {
	constructor() {
		if (!instance) {
			console.log('NoteService 생성' + this)
			instance = this
		}
		return instance
  }


  async create ( modelObj) {
    await Note.create(modelObj)

    const newNote = await Note.findOne({
      where : JSON.parse(JSON.stringify(modelObj))
    })
    
    return newNote 
  }

  async findOne (where ) {

    return await Note.findOne({
      where: JSON.parse(JSON.stringify(where)),
      include : {
        model : Problem,
        as : 'problem',
        include: [
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
        ]
      }
    })

  }

  async findWeeklyList ( studentId , startDate, endDate ) {

    return await Note.findAll({
      where : {
        studentId,
        updatedAt: {
          [Op.lt]: endDate ,
          [Op.gt]: startDate
        }
      }
    })

  }

  async findList ( where ) {

    return await Note.findAll({
      where: JSON.parse(JSON.stringify(where)),
      include : {
        model : Problem,
        as : 'problem',
        include: [
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
          },{
            model : Subject,
            as : 'subject'
          }
        ]
      }
    })


  }

	async update(id, note) {
	
		await Note.update(note, {
			where: { id },
		})
		const updatedNote = await Note.findOne({
      where: { id },
      include : {
        model : Problem,
        as : 'problem',
        include: [
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
        ]
      }
		})
		if (updatedNote === null) throw Error('NOTE_NOT_FOUND')

		return updatedNote
  }
  
  async findLongList ( studentId ) {

    return await Note.findAll({
      where: {
        studentId,
        spendingTime : {
          [Op.gte] : 3000
        }
      },
      include : {
        model : Problem,
        as : 'problem',
        include: [
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
          },{
            model : Subject,
            as : 'subject'
          }
        ]
      }
    })


  }

}

export default new NoteService()