import Sequelize from 'sequelize'

export default class Score extends Sequelize.Model {


    static init(sequelize) {
        return super.init(
            {
                accountId : {
                    type : Sequelize.INTEGER,
                    defaultValue : -1
                },
                type: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                subject: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                score: {    
                    type: Sequelize.INTEGER,
                    defaultValue : -1,
                },
                grade: {
                    type : Sequelize.INTEGER,
                    defaultVale : -1
                },
                percentile : {
                    type : Sequelize.INTEGER,
                    defaultValue : -1
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
