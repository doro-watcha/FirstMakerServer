import Sequelize from 'sequelize'

export default class Score extends Sequelize.Model {


    static init(sequelize) {
        return super.init(
            {
                type: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                line: {
                    type : Sequelize.STRING,
                    allowNull : true 
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
                foreign_score : {
                    type : Sequelize.INTEGER,
                    defaultValue : 0
                },
                foreign_grade : {
                    type : Sequelize.INTEGER,
                    defaultValue : 0
                },
                foreign_percentile : {
                    type : Sequelize.INTEGER,
                    defaultValue : 0
                },
                total_score : {
                    type : Sequelize.FLOAT,
                    defaultValue : 0.0
                },
                total_percentile : {
                    type : Sequelize.FLOAT,
                    defaultValue : 0.0 
                },
                naesin : {
                    type : Sequelize.FLOAT,
                    defaultValue : 0.0
                },
                naesin_type : {
                    type : Sequelize.STRING,
                    allowNull : true 
                },
                userId : {
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
            foreginKey: 'userId',
            as : 'user'
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
		type: {
			type: 'string',
			example: '가',
        },
        line : {
            type : 'string',
            example : '사회탐구'
        },
        korean_score : {
            type : 'integer',
            example : 130
        },
        korean_grade : {
            type : 'integer',
            example : 1
        },
        korean_percentile : {
            type : 'integer',
            example : 97
        },
        math_score : {
            type : 'integer',
            example : 130
        },
        math_grade : {
            type : 'integer',
            example : 1
        },
        math_percentile : {
            type : 'integer',
            example : 97
        },
        english_grade : {
            type : 'integer',
            example : 3
        },
        history_grade : {
            type : 'integer',
            example : 1
        },
        tamgu1_score : {
            type : 'integer',
            example : 130
        },
        tamgu1_grade : {
            type : 'integer',
            example : 1
        },
        tamgu1_percentile : {
            type : 'integer',
            example : 97
        },
        tamgu2_score : {
            type : 'integer',
            example : 130
        },
        tamgu2_grade : {
            type : 'integer',
            example : 1
        },
        tamgu2_percentile : {
            type : 'integer',
            example : 97
        },
        foreign_score : {
            type : 'integer',
            example : 130
        },
        foreign_grade : {
            type : 'integer',
            example : 1
        },
        foreign_percentile : {
            type : 'integer',
            example : 97
        },
        naesin_type : {
            type : 'string',
            example : '국수영사'
        },
        naesin : {
            type : 'float',
            example : '1.3'
        },
        total_score : {
            type : 'integer',
            example : 880
        },
        total_percentile : {
            type : 'integer',
            example : 99
        },
        user : {
            $ref: '#/components/schemas/User'
        }
	},
	required: ['id','user']
}
