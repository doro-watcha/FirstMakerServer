
import sequelize from 'sequelize'
import moment from 'moment'

import { ClassBelongs , Student, Class, Teacher } from '../models'
let instance = null

class ClassBelongsService {
	constructor() {
		if (!instance) {
			console.log('ClassBelongs Service 생성' + this)
			instance = this
		}
		return instance
  }

  async create ( modelObj) {
    return await ClassBelongs.create(modelObj)
  }

  async findList ( where ) {

    return await ClassBelongs.findOne({
      where : JSON.parse(JSON.stringify(where)),
      include : 
      {
        model : Student,
        as : 'student'
      }
    })
  }

  async findOne ( where ) {

    return await ClassBelongs.findOne({
      where : JSON.parse(JSON.stringify(where)),
      include : 
      {
        model : Student,
        as : 'student'
      }
    })
  }

  async findOneByStudentId ( studentId ) {

    return await ClassBelongs.findOne({
      where : {
        studentId
      },
      include :{
        model : Class,
        as : 'class'
      }
    })
  }

  async findListByStudentId ( studentId ) {

    return await ClassBelongs.findAll({
      where : {
        studentId
      },
      include : {
        model : Class,
        as: 'class'
      }
    })

  }

  async delete ( studentId , classId  ) {

    return await ClassBelongs.destroy({
      where : {
        studentId,
        classId
      }
    })

    
  }
}


export default new ClassBelongsService()