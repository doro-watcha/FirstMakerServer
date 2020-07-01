import Sequelize from 'sequelize'

export default class Score extends Sequelize.Model {


    static init(sequelize) {
        return super.init(
            {
                type: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                korean_score: {    
                    type: Sequelize.INTEGER,
                    defaultValue : 0,
                },
                korean_grade: {
                    type : Sequelize.INTEGER,
                    defaultVale : 0
                },
                korean_percentile : {
                    type : Sequelize.INTEGER,
                    defaultValue : 0
                },
                english_grade : {
                    type : Sequelize.INTEGER,
                    defaultValue : 0
                },
                math_score: {    
                    type: Sequelize.INTEGER,
                    defaultValue : 0,
                },
                math_grade: {
                    type : Sequelize.INTEGER,
                    defaultVale : 0
                },
                math_percentile : {
                    type : Sequelize.INTEGER,
                    defaultValue : 0
                },
                tamgu1_score: {    
                    type: Sequelize.INTEGER,
                    defaultValue : 0,
                },
                tamgu1_grade: {
                    type : Sequelize.INTEGER,
                    defaultVale : 0
                },
                tamgu1_percentile : {
                    type : Sequelize.INTEGER,
                    defaultValue : 0
                },
                tamgu2_score: {    
                    type: Sequelize.INTEGER,
                    defaultValue : 0,
                },
                tamgu2_grade: {
                    type : Sequelize.INTEGER,
                    defaultVale : 0
                },
                tamgu2_percentile : {
                    type : Sequelize.INTEGER,
                    defaultValue : 0
                },
                history_grade : {
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
		userId: {
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
