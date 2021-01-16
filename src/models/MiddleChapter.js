import Sequelize from 'sequelize'

export default class MiddleChapter extends Sequelize.Model {

  static init(sequelize) {
    return super.init (
      {
          // 중단원 이름 
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
    this.belongsTo(models.BigChapter, {
      foreignKey: 'bigChapterId',
      as: 'bigChapter'
    }),
    this.hasMany(models.SmallChapter, {
      foreignKey : 'middleChapterId',
      as : 'smallChapter'
    }),
    this.hasMany(models.Problem, {
      foreignKey : 'middleChapterId',
      as : 'problem'
    })
  }

  toJSON() {
    const object = Object.assign({}, this.dataValues)
  
    // delete some (key, value)
   
    delete object.createdAt
    delete object.updatedAt

    delete object.bigChapterId

    return object
  }
}