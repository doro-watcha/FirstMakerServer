import Sequelize from 'sequelize'

export default class PaymentRecord extends Sequelize.Model {


    static init(sequelize) {
        return super.init(
            {
              amount : {
                type : Sequelize.INTEGER,
                defaultValue : 0
              },
              predictTimes : {
                type : Sequelize.INTEGER,
                defaultValue : 0
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
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      })
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
		accountId: {
			type: 'integer',
			example: 0,
		},
		subject: {
			type: 'string',
			example: 'koean',
		},
		type: {
			type: 'strig',
            example: '나',
		},
		score: {
			type: 'integer',
			example: 133,
		},
		grade: {
			type: 'integer',
			example: 1,
		},
		percentile: {
            type: 'integer',
            example : 94
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
	required: ['id', 'subject', 'type','score','grade','percentile'],
}
