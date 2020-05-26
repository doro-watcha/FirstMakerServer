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
				strong_val: {
					type : Sequelize.FLOAT,
                    allowNull : false,
				},
				safe_val: {
					type : Sequelize.FLOAT,
                    allowNull : false,
				},
				dangerous_val: {
					type : Sequelize.FLOAT,
                    allowNull : false,
                },
                sniping_val : {
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