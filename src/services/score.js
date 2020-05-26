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
            where : { accountId }
        })
    }
}

export default new ScoreService()