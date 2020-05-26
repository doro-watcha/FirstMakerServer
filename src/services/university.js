import { University } from  '../models'


class UniversityService {

    async findByMajor (name , major, type) {
        console.log("fuck")
        return await University.findOne({

            where : { name }
        })
    }
}


export default new UniversityService()