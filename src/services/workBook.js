
import sequelize from 'sequelize'

import { WorkBook , Student , Subject , BigChapter} from '../models'

let instance = null

class WorkBookService {
	constructor() {
		if (!instance) {
			console.log('WorkBook Service 생성' + this)
			instance = this
		}
		return instance
	}

	async create(modelObj) {
    await WorkBook.create(modelObj)

    return true 
  }

  async buy ( studentId , workBookId ) {

    const student = await Student.findOne({
      where : {
        id : studentId
      }
    })

    if ( student == null ) throw Error('STUDENT_NOT_FOUND')

    const workBook = await WorkBook.findOne({
      where : {
        id : workBookId
      }
    })

    if ( workBook == null ) throw Error('WORK_BOOK_NOT_FOUND')

    workBook.addStudent(student, {
      through : {

      }
    })

    return true 
  }

  async findAll () {

    return await WorkBook.findAll({
      where : {
        
      }
    })
  }
  async findOne ( where ) {

    return await WorkBook.findOne({
      where : JSON.parse(JSON.stringify(where)),
      include : [
        {
          model : Subject,
          as : 'subject',
          include : {
            model : BigChapter,
            as : 'bigChapter'
          }
        }
      ]
    })
  }

	async delete ( id ) {

		const WorkBook = await WorkBook.findOne({where: id})
        
    if ( WorkBook == null ) {
        throw Error ('WORK_BOOK_NOT_FOUND')
    } else {
        await WorkBook.destroy()
    }
	}
  


}

export default new WorkBookService()