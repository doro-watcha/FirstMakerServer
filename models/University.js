import Sequelize from 'sequelize'

export default class University extends Sequelize.Model {


    static init(sequelize) {
        return super.init (
            {

            },
            {
                sequelize,
            },
        )
    }

}