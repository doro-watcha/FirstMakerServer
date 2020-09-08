import { Test } from '../models'

let instance = null

class TestService {

    constructor() {
      if (!instance) {
        console.log('Test Service 생성' + this)
        instance = this
      }
      return instance
    }
    
    async create ( modelObj) {
      return await Test.create(modelObj)
    }

    async findAll () {
      return await Test.findAll()
    }

    async deleteAll ( ) {

      return await Test.destroy({
        where : {}
      })
    }

    async update ( id , modelObj ) {
      return await Test.update ( modelObj, {
        where : {
          id
        }
      })
    }
}


export default new TestService()