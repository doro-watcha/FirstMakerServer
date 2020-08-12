import { University } from  '../models'
import sequelize from 'sequelize'

let instance = null

class UniversityService {

    constructor() {
		if (!instance) {
			console.log('University Service 생성' + this)
			instance = this
		}
		return instance
    }
    
    async create ( modelObj ) {
        return await University.create(modelObj)
    }

    async findList(where) {
        return await University.findAll({
			where : JSON.parse(JSON.stringify(where))
		})
    }

	async findOne(where) {
		return await University.findOne({
			where: JSON.parse(JSON.stringify(where))
		})
	}                           
    async update ( id , modelObj ) {
        await University.update(modelObj, {
            where: { id },
        })

        const updatedUniversity = await University.findOne({
            where: { id },
        })
        if (updatedUniversity === null) throw Error('UNIVERSITY_NOT_FOUND')

        return updatedUniversity
    }

    async delete ( id ) {
        const university = await University.findOne({
            where : { id }
        })

        if ( university == null ) throw Error('UNIVERSITY_NOT_FOUND')
        else {
            await university.destroy()
        }
        
    }

    async deleteAll ( ) {
        // let query = `ALTER TABLE Universities AUTO_INCREMENT = 1;`
        // await sequelize.query(query)
    
        return await University.destroy({
            where : {}
        })
      }
}

export default new UniversityService()