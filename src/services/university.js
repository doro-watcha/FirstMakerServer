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

    async findByMajor (name , major, line) {
        console.log("fuck")
        return await University.findOne({
            where : { name , major , line },
            attributes : [ "strong_val" , "safe_val" , "dangerous_val", "sniping_val"]
        })
    }

    async findList ( name , line ) {

        return await University.findAll({
            where : { name , line}
        })
    }
    async findAll() {
        return await University.findAll({

        })
    }
}

export default new UniversityService()