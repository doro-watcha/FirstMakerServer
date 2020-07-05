import Sequelize from 'sequelize'

export default class Score extends Sequelize.Model {


    static init(sequelize) {
        return super.init(
            {
                line: {
                    type : Sequelize.STRING,
                    allowNull : true 
                },
                korean : {
                    type : Sequelize.JSON,
                    allowNull : true
                },
                math : {
                    type : Sequelize.JSON,
                    allowNull : true 
                },
                english : {
                    type : Sequelize.JSON,
                    allowNull : true
                },
                tamgu1 : {
                    type : Sequelize.JSON,
                    allowNull : true
                },
                tamgu2 : {
                    type : Sequelize.JSON,
                    allowNull : true
                },
                history : {
                    type : Sequelize.JSON,
                    allowNull : true
                },
                foreign : {
                    type : Sequelize.JSON,
                    allowNull : true
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
        user : {
            $ref: '#/components/schemas/User'
        }
	},
	required: ['id','user']
}
