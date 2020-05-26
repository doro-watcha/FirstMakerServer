import Sequelize from 'sequelize'

export default class University extends Sequelize.Model {


    static init(sequelize) {
        return super.init (
            {
                type: {
					type: Sequelize.INTEGER,
					allowNull: false,
				},
				group: {
					type: Sequelize.INTEGER,
					allowNull: false,
				},
				name: {    
					type: Sequelize.STRING,
					allowNull : false,
				},
				major: {
					type: Sequelize.STRING,
					allwoNull: false,
				},
				majorCode: {
					type: Sequelize.INTEGER,
					defaultValue: -1,
				},
				strongValue: {
					type : Sequelize.FLOAT,
                    allowNull : false,
				},
				safeValue: {
					type : Sequelize.FLOAT,
                    allowNull : false,
				},
				dangerousValue: {
					type : Sequelize.FLOAT,
                    allowNull : false,
                },
                snipingValue : {
                    type : Sequelize.FLOAT,
                    allowNull : false,
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

}