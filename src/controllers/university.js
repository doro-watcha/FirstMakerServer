import universityService from( '../services')

export default class UniversityController {


    static async predict ( req, res ) {
        const name = req.body.name
        const major = req.body.major
        const type = req.body.type


        const result = await universityService.findByMajor(name , major, type)


    }
}