import { Major } from  '../models'

let instance = null

class MajorService {

    constructor() {
		if (!instance) {
			console.log('Majfor Service 생성' + this)
			instance = this
		}
		return instance
  }

  async create ( modelObj ) {
    return await Major.create(modelObj)
  }

  async findList ( univId , line ) {

    return await Major.findAll({
      where : { univId , line}
    })
  }

  async findAll() {
    return await Major.findAll({})
  }

  async update ( id, modelObj ) {

    await Major.update(modelObj, {
      where: { id }
    })

    const updatedMajor = await Major.findOne({
        where: { id }})
    if (updatedMajor === null) throw Error('MAJOR_NOT_FOUND')

    return updatedMajor
  }

  async delete ( id ) {
    const major = await Major.findOne({
			where: {
				id
			}
        })
        
        if ( major == null ) {
            throw Error ('MAJOR_NOT_FOUND')

        } else {

            await major.destroy()
        }
    }
  
}

export default new MajorService()