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

		await User.create(user)

		const newUser = User.findOne({
			where : { email : user.email},
			attributes : ['name','email']
		})

		if ( newUser == null ) throw Error('USER_NOT_FOUND')
		else {
			return true
		}
  }

  async findById(id) {
		return await User.findOne({
			where : { id },
			attributes : ['id','academyId','name', 'email','telephone','highschool','line','gender','graduateYear','predictTimes']
		})
	}

	async findOne(where) {
		return await User.findOne({
			where: JSON.parse(JSON.stringify(where))
		})
	}

	async findAll(where) {
		return await User.findAll({
			where : JSON.parse(JSON.stringify(where))
		})
	}
	
	async update(id, user) {
	
		await User.update(user, {
			where: { id },
		})
		const updatedUser = await User.findOne({
			where: { id },
		})
		if (updatedUser === null) throw Error('USER_NOT_FOUND')

		return updatedUser
	}

	async delete ( id ) {
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