import Sequelize from 'sequelize'

export default class WorkPaper extends Sequelize.Model {

  static init(sequelize) {
    return super.init (
      {
        // 문제지 이름 
        title : {
          type : Sequelize.STRING,
          alloNull : true 
        },
        status : {
          type : Sequelize.STRING,
          defaultValue : "준비됨"
        },
        numChapters: {
          type : Sequelize.INTEGER,
          defaultValue : 1
        },
        mainChapter : {
          type : Sequelize.STRING,
          allowNull : false
        },
        spendingTime : {
          type : Sequelize.INTEGER,
          defaultValue : 0
        },
        accurateRate : {
          type : Sequelize.FLOAT,
          defaultValue : 0.0
        }
      },
      {
        sequelize 
      }
    )
  }


  static associate(models) {
    this.belongsTo(models.Student, {
      foreignKey: 'studentId',
      as: 'author'
    }),
    this.hasMany(models.Note,{
      foreignKey : 'workPaperId',
      as : 'note'
    })
  }

  toJSON() {
    const object = Object.assign({}, this.dataValues)
  
    // delete some (key, value)
   
    delete object.updatedAt

    return object
  }
}