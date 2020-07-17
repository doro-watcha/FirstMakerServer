import Sequelize from 'sequelize'
import bycrypt from 'bcrypt'


export default class Academy extends Sequelize.Model {


    static init(sequelize) {
        return super.init(
            {
              name : {
                type : Sequelize.STRING,
                allowNull : true
              },
              createdAt: {
                  type: Sequelize.DATE,
                  allowNull: true,
                  defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
              },
              updatedAt: {
                  type: Sequelize.DATE,
                  allowNull: true,
                  defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                  onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
              },
            },
            {

                sequelize
            },

        )
    }

    static associate(models) {
      this.hasMany(models.User, {
        foreignKey: 'academyId',
        as: 'student',
      })
    }

    static hashPassword(unencryptedPwd) {
			return bycrypt.hashSync(unencryptedPwd, 8)
		}

		isValidPassword(unencryptedPwd) {
			return bycrypt.compareSync(unencryptedPwd, this.password)
    }	
    

		toJSON() {
			const object = Object.assign({}, this.dataValues)
		
			// delete some (key, value)
		 
			delete object.createdAt
			delete object.updatedAt
	
			
			return object
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
      example :  '볼사지영수학학원'
    },
    password : {
      type : 'string',
      example : 'password'
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
    }
	},
}
