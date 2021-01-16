import moment from 'moment-timezone'

import { User, Student, Teacher  } from '../models'

import Sequelize from 'sequelize'
let instance = null

const Op = Sequelize.Op;

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

		const newUser = User.findOne(
			{ 
				where : {
					email : user.email
				}
		})

		if ( newUser == null ) throw Error('USER_NOT_FOUND')
		else {
			return newUser
		}
  }
	async findOne(where) {
		return await User.findOne({
			where: JSON.parse(JSON.stringify(where)),
			include : [
				{
					model : Teacher,
					as : 'teacher'
				},
				{
					model : Student,
					as : 'student'
				}
			]
		})
	}

	async findList(where) {
		return await User.findAll({
			where : JSON.parse(JSON.stringify(where)),
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

	async findUserByStudentName ( studentName ) {


		return await User.findAll({
			where : {
				name :  {
					[Op.like]: "%" + studentName + "%"
				},
				type : "student"
			},
			include : {
				model : Student,
				as : 'student'
			}
		})

	}
}

export default new UserService()