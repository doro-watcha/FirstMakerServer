import Sequelize from 'sequelize'

export default class Subject extends Sequelize.Model {

  static init(sequelize) {
    return super.init (
      {
          // 단원 이름 
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
    this.hasMany(models.BigChapter, {
      foreignKey: 'subjectId',
      as: 'bigChapter'
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