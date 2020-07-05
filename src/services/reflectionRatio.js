import { ReflectionRatio } from  '../models'

let instance = null

class ReflectionRatioService {

    constructor() {
		if (!instance) {
			console.log('ReflectionRatio Service 생성' + this)
			instance = this
		}
		return instance
  }

  async create ( modelObj ) {
    return await ReflectionRatio.create(modelObj)
  }

  async findOne(id) {
    return await ReflectionRatio.findOne({
      where : { id }
    })
  }
  
  async findByUnivId (univId) {
    return await ReflectionRatio.findOne({
      where : { univId}
    })
  }


  async update ( id , modelObj) {

    await ReflectionRatio.update(modelObj, {
        where: { id },
    })

    const updateReflectionRatio = await ReflectionRatio.findOne({
        where: { id },
    })
    if (updateReflectionRatio === null) throw Error('REFLECTION_RATIO_NOT_FOUND')

    return updateReflectionRatio

}

async delete ( id ) {

const reflectionRatio = await ReflectionRatio.findOne({
  where: {
    id
  }
    })
    
    if ( reflectionRatio == null ) {
        throw Error ('REFLEcTION_RATIO_NOT_FOUND')
    } else {
        await reflectionRatio.destroy()
    }
}
}

export default new ReflectionRatioService()