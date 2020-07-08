import { Academy  } from  '../models'

let instance = null

class AcademyService {

    constructor() {
		if (!instance) {
			console.log('Academy Service 생성' + this)
			instance = this
		}
		return instance
  }

  async create ( modelObj ) {
    		// hash password
		if (modelObj.password) modelObj.password = Academy.hashPassword(modelObj.password)

		return await Academy.create(modelObj)
  }

  async findAll (where) {
    return Academy.findAll({
      where : JSON.parse(JSON.stringify(where))
  })
  }

	async findOne(where) {
		return await Academy.findOne({
			where: JSON.parse(JSON.stringify(where))
		})
	}

  async update ( id, modelObj ) {
      await Academy.update(modelObj, {
        where: { id },
    })

    const updatedAcademy = await Academy.findOne({
        where: { id },
    })
    if (updatedAcademy === null) throw Error('ACADEMY_NOT_FOUND')

    return updatedAcademy 
  }

  async delete ( id ) {
    const academy = await Academy.findOne({
			where: {
				id
			}
        })
        
        if ( academy == null ) {
            throw Error ('ACADEMY_NOT_FOUND')

        } else {

            await academy.destroy()
        }
    }
  
}

export default new AcademyService()
