import Sequelize from 'sequelize'

export default class Exam extends Sequelize.Model {

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
            accurateRate : {
              type : Sequelize.FLOAT,
              defaultValue : 0.0
            },
            spendingTime : {
              type : Sequelize.INTEGER,
              defaultValue : 0
            },
            timeLimit : {
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
    this.belongsTo(models.Student, {
      foreignKey: 'studentId',
      as: 'author'
    }),
    this.belongsTo(models.Teacher,{
      foreignKey : 'teacherId',
      as : 'teacher'
    }),
    this.hasMany(models.Note,{
      foreignKey : 'examId',
      as : 'note'
    })
  }

  toJSON() {
    const object = Object.assign({}, this.dataValues)
  
    // delete some (key, value)
   
    //delete object.createdAt
    delete object.updatedAt
    delete object.teacherId
    delete object.studentId

    return object
  }
}