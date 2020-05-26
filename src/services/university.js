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

    async findByMajor (name , major, type) {
        console.log("fuck")
        return await University.findOne({
            where : { name , major , type },
            attributes : [ "strong_val" , "safe_val" , "dangerous_val", "sniping_val"]
        })
    }
}

export default new UniversityService()