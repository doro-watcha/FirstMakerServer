
import sequelize from 'sequelize'
import moment from 'moment'

import { Class  , Teacher, ClassBelongs, Student} from '../models'
let instance = null

class ClassService {
	constructor() {
		if (!instance) {
			console.log('Class Service 생성' + this)
			instance = this
		}
		return instance
  }

  async create ( modelObj) {
    return await Class.create(modelObj)
  }

  async findList ( where ) {

    return await Class.findAll({
      where : JSON.parse(JSON.stringify(where)),
      include : [
        {
          model : Teacher,
          as : 'teacher'
        },
        {
          model : ClassBelongs,
          as : 'classBelongs',
          include : {
            model : Student,
            as : 'student'
          }
        }
      ]
    })
  }

  async findOne ( where ) {

    return await Class.findOne({
      where : JSON.parse(JSON.stringify(where)),
      include : [
        {
          model : Teacher,
          as : 'teacher'
        },
        {
          model : ClassBelongs,
          as : 'classBelongs',
          include : {
            model : Student,
            as : 'student'
          }
        }
      ]
    })
  }

  

}


export default new ClassService()