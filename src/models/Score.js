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
                    allowNull: false,
                },
                subject: {
                    type: Sequelize.STRING,
                    allowNull: false,
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

                sequelize
            },

        )
    }
}