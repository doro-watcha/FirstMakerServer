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
    this.hasMany(models.Problem, {
      foreignKey : 'subjectId',
      as : 'problem'
    })
    this.hasMany(models.WorkBook,{
      foreignKey : 'subjectId',
      as : 'workBooks'
    })
    this.hasMany(models.WorkBookRecord,{
      foreignKey : 'subjectId',
      as : 'subject'
    })
  }

  toJSON() {
    const object = Object.assign({}, this.dataValues)
  
    // delete some (key, value)
   
    delete object.createdAt
    delete object.updatedAt
    delete object.workBookId


    return object
  }

}