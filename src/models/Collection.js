import Sequelize from 'sequelize'

export default class Collection extends Sequelize.Model {

  static init(sequelize) {
    return super.init (
      {
          // 문제 title 
          title: {
            type: Sequelize.STRING,
            allowNull : true,
          },
          type : {
            type : Sequelize.STRING,
            allowNull  : true
          },
          timeLimit : {
            type : Sequelize.INTEGER,
            allowNull : true
          },
          status : {
            type : Sequelize.STRING,
            defaultValue : "READY"
          }
      },
      {
        sequelize 
      }
    )
  }
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'author'
    }),
    this.hasMany(models.Note,{
      foreignKey : 'collectionId',
      as : 'note'
    })
  }
  

  toJSON() {
    const object = Object.assign({}, this.dataValues)
  
    // delete some (key, value)
   
    delete object.createdAt
    delete object.updatedAt

    return object
  }
  
}