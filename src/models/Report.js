import Sequelize from 'sequelize'

export default class Report extends Sequelize.Model {


    static init(sequelize) {
        return super.init(
            {
              score : {
                type : Sequelize.FLOAT,
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
        this.belongsTo(models.Major, {
          foreignKey: 'majorId',
          as: 'major',
        }),
        this.belongsTo(models.User, {
          foreignKey: 'userId',
          as: 'user'
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
    score : {
      type : 'float',
      example :  725.3
    },
    userId : {
      type : 'integer',
      example : 3
    },
    university : {
				$ref: '#/components/schemas/University',
		
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
