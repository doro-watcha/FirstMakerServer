import Sequelize from 'sequelize'

export default class BigChapter extends Sequelize.Model {

  static init(sequelize) {
    return super.init (
      {
          // 문제 Image Url
          name: {
            type: Sequelize.STRING,
            allowNull : true,
          },
          numMiddle : {
            type : Sequelize.INTEGER,
            defaultValue : 0
          },
          numSmall : {
            type : Sequelize.INTEGER,
            defaultValue : 0
          }
      },
      {
        sequelize 
      }
    )
  }

  static associate(models) {

    this.belongsTo(models.Subject,{
      foreignKey : 'subjectId',
      as : 'subject'
    }),

    this.hasMany(models.MiddleChapter,{
      foreignKey : 'bigChapterId',
      as : 'middleChapter'
    }),
  
    this.hasMany(models.Problem, {
      foreignKey : 'bigChapterId',
      as : 'problem'
    })
    this.hasMany(models.WorkBookRecord,{
      foreignKey : 'bigChapterId',
      as: 'workBookRecords'
    })
  }

  toJSON() {
    const object = Object.assign({}, this.dataValues)
  
    // delete some (key, value)
   
    delete object.createdAt
    delete object.updatedAt
    delete object.subjectId

    return object
  }
}