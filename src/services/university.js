import { University } from  '../models'

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

    async findAll() {
        return await University.findAll({
            attributes : ['name', 'min','max', 'group']
        })
    }

    async findOne(id) {
        return await University.findOne({
            where : {id}
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
}

export default new UniversityService()