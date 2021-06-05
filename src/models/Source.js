
import Sequelize from 'sequelize'

export default class Source extends Sequelize.Model {

  static init(sequelize) {
    return super.init (
      {
        
        name: {
          type: Sequelize.STRING,
          allowNull : true,
        },

      },
      {
        sequelize

      }
    )

  }


  toJSON() {
    const object = Object.assign({}, this.dataValues)
  
    // delete some (key, value)
   
    delete object.createdAt
    delete object.updatedAt

    return object
  }

}