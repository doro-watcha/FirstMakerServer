import Sequelize from 'sequelize'

export default class SmallChapter extends Sequelize.Model {

  static init(sequelize) {
    return super.init (
      {
          // 소단원 이름 
          name: {
            type: Sequelize.STRING,
            allowNull : true,
          }

      },
      {
        sequelize 
      }
    )
  }

  static associate(models) {
    this.belongsTo(models.MiddleChapter, {
      foreignKey: 'middleChapterId',
      as: 'middleChapter'
    }),
    this.hasMany(models.Problem, {
      foreignKey : 'smallChapterId',
      as : 'problem'
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