var { University } = require( '../models')


class UniversityService {



    async findByMajor (name , major, type) {
        return await University.findOne({

            where : { name, major , type}
        })
    }
}
