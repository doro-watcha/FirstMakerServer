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
    
    async create ( modelObj) {
        return await Score.create(modelObj)
    }

    async findByUserId (userId) {
        return await Score.findOne({
            where : { userId : userId  }
        })
    }

    async updateById ( userId , score) {

        await Score.update(score, {
            where: { userId },
        })

        const updatedScore = await Score.findOne({
            where: { userId },
        })
        if (updatedScore === null) throw Error('SCORE_NOT_FOUND')

        return updatedScore

    }

    async deleteById ( userId ) {

		const score = await Score.findOne({
			where: {
				userId
			}
        })
        
        if ( score == null ) {
            throw Error ('SCORE_NOT_FOUND')

        } else {

            await score.destroy()
        }
    }

}

export default new ScoreService()