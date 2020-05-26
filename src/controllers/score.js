import { scoreService } from '../services'

export default class ScoreService {

    static async getScore ( req, res ) {

        const accountId = req.query.accountId

        const result = await scoreService.findByAccountId(accountId)

        const response = {
            data : {
                result
            },
            success : true
        }

        res.send(response)

    }

    static async setScore ( req, res ) {


    }
}

