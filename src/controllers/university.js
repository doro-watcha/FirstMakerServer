import { universityService } from '../services'

export default class UniversityController {

    static async findList ( req, res ) {
        
        var name = req.query.name
        var line = req.query.line

        const result = await universityService.findList ( name , line)

        const response = {
            success : true,
            data : {
                result
            }
        }

        res.send(response)
    }

    static async findAll( req, res ){

        const result = await universityService.findAll()
        
        const response = {
            success : true,
            data : {
                result
            }
        }
        res.send(response)
    }

    static async predict ( req, res ) {
        const name = req.body.name
        const major = req.body.major
        const line = req.body.line

        const result = await universityService.findByMajor(name , major, line)


        const response = {
            success : true,
            data : {
                result
            }
        }
        res.send(response)
    }
}