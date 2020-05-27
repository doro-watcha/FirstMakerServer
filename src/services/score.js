import { Score } from '../models'

let instance = null

class ScoreService {

    constructor() {
		if (!instance) {
			console.log('Score Service 생성' + this)
			instance = this
		}
		return instance
	}

    async findByAccountId (accountId) {
        return await Score.findAll({
            where : { accountId },
            attributes : ["subject","type","score","grade","percentile"]
        })
    }

    async setScore ( score ) {
    }
}

export default new ScoreService()