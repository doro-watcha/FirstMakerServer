
import sequelize from 'sequelize'

import { Note } from '../models'
import { randomBytes } from 'crypto'

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
    return await Note.create(modelObj)
  }

  async findOne (where ) {

  }

  async findList ( where ) {



  }


}