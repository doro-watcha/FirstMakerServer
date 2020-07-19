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
        
        this.belongsTo(models.User, {
          foreignKey: 'userId',
          as: 'user'
        }),
        this.belongsTo(models.MajorData, {
          foreignKey: 'majorDataId',
          as : 'majorData'
        })
      }

      toJSON() {
        const object = Object.assign({}, this.dataValues)
      
        // delete some (key, value)
       
        delete object.createdAt
        delete object.updatedAt
        
        delete object.userId
        delete object.majorDataId
        delete object.majorId
    
        
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
    score : {
      type : 'float',
      example :  725.3
    },
    user : {
      $ref: '#/components/schemas/User'
    },
    major : {
				$ref: '#/components/schemas/Major'
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
  required : ['id', 'score', 'user', 'major']
}
