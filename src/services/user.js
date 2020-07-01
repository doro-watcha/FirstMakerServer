import moment from 'moment-timezone'
import sequelize from 'sequelize'

import { User, Token } from '../models'

let instance = null

class UserService {
	constructor() {
		if (!instance) {
			console.log('UserService 생성' + this)
			instance = this
		}
		return instance
	}

	async create(user) {
		// hash password
		if (user.password) user.password = User.hashPassword(user.password)

		return await User.create(user)
  }

  async findById(id) {
		return await User.findByPk(id)
	}

	async findOne(where) {
		return await User.findOne({
      where: JSON.parse(JSON.stringify(where))
		})
	}
	
	async updateId(id, user) {
		return await User.update(user, {
			where :  {id},
		})
	}

	async deleteById ( id ) {
		const user = await User.findOne({
			where: {
				id
			}
        })
        
        if ( user == null ) {
            throw Error ('USER_NOT_FOUND')

        } else {

            await user.destroy()
        }
	}
}

export default new UserService()