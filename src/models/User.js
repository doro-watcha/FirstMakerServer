import Sequelize from 'sequelize'
import bycrypt from 'bcrypt'

export default class User extends Sequelize.Model {


    static init(sequelize) {
        return super.init (
            {
            name: {
							type: Sequelize.STRING,
							allowNull: false,
						},
						userId : {
							type : Sequelize.STRING,
							allowNull : false,
						},
						password : {
							type : Sequelize.STRING,
							allowNull : false
						},
						email: {
							type: Sequelize.STRING,
							allowNull: true,
						},
						highSchool: {    
							type: Sequelize.STRING,
							allowNull : true,
						},
						line: {
							type: Sequelize.INTEGER,
							allwoNull: true,
						},
						graduateYear: {
							type: Sequelize.INTEGER,
							defaultValue: -1,
						},
						isVerified : {
							type : Sequelize.BOOLEAN,
							defaultValue: false
						},
						predictTimes : {
							type : Sequelize.INTEGER,
							defaultValue : 0
						},
						createdAt: {
							type: Sequelize.DATE,
							allowNull: false,
							defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
						},
						updatedAt: {
							type: Sequelize.DATE,
							allowNull: false,
							defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
							onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
						},
                

            },
            {
                sequelize,
            },
        )
		}
		
		static hashPassword(unencryptedPwd) {
			return bycrypt.hashSync(unencryptedPwd, 8)
		}

		isValidPassword(unencryptedPwd) {
			return bycrypt.compareSync(unencryptedPwd, this.password)
		}

}



// swagger schema
export const schema = {
	type: 'object',
	properties: {
		id: {
			type: 'integer',
			example: 3,
		},
		name : {
			type : 'string',
			example : '안지영'
		},
		email : {
			type : 'string',
			example : 'Bol4@gmail.com'
		},
		highSchool : {
			type : 'string',
			example : '볼사고등학교'
		},
		line : {
			type : 'integer',
			example : '0'
		},
		graduateYear : {
			type : 'integer',
			example : '2013'
		},
		isVerfieid : {
			type : 'boolean',
			example : false
		},
		predictTimes : {
			type : 'integer',
			example : 3
		}
	}
}
