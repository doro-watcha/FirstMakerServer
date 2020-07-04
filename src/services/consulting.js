import { Consulting , User } from  '../models'

let instance = null

class ConsultingService {

    constructor() {
		if (!instance) {
			console.log('Consulting Service 생성' + this)
			instance = this
		}
		return instance
  }

  async create ( modelObj ) {
    const { studentId } = modelObj

    const student = await User.findOne({
      where : {id : studentId}
    })

    if ( student == null ) throw Error('USER_NOT_FOUND')
    else {
      return await Consulting.create(modelObj)
    }

  }

  async findAll () {
    return Consulting.findAll()
  }

  async findOne( id ) {
    return Consulting.findOne({
      where : { id }
    })
  }


  async update ( id, modelObj ) {
      await Consulting.update(modelObj, {
        where: { id },
    })

    const updatedConsulting = await Consulting.findOne({
        where: { id },
    })
    if (updatedConsulting === null) throw Error('CONSULTING_NOT_FOUND')

    return updatedConsulting 
  }

  async delete ( id ) {
    const consulting = await Consulting.findOne({
			where: {
				id
			}
        })
        
        if ( consulting == null ) {
            throw Error ('CONSULTING_NOT_FOUND')

        } else {

            await consulting.destroy()
        }
    }
  
}

export default new ConsultingService()
