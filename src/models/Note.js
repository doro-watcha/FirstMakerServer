import Sequelize from 'sequelize'

export default class Note extends Sequelize.Model {

  static init(sequelize) {
    return super.init (
      {
          // 문제 상태
          status: {
            type: Sequelize.STRING,
            defaultValue : "준비됨",
          },
          submit : {
            type : Sequelize.STRING,
            defaultValue : 0 
          },
          spendingTime : {
            type : Sequelize.INTEGER,
            defaultValue : 0
          },
          isGreenStar : {
            type : Sequelize.BOOLEAN,
            defaultValue : false 
          }

      },
      {
        sequelize 
      }
    )
  }

  static associate(models) {

    this.belongsTo(models.Homework,{
      foreignKey : 'homeworkId',
      as : 'homework'
    }),
    this.belongsTo(models.Exam, {
      foreignKey : 'examId',
      as : 'exam'
    }),
    this.belongsTo(models.WorkBook,{
      foreignKey : 'workBookId',
      as : 'workBook'
    }),
    this.belongsTo(models.WorkPaper,{
      foreignKey : 'workPaperId',
      as : 'workPaper'
    }),
    this.belongsTo(models.Problem,{
      foreignKey : 'problemId',
      as : 'problem'
    }),
    this.belongsTo(models.Student,{
      foreignKey : 'studentId',
      as : 'student'
    })
  }


  toJSON() {
    const object = Object.assign({}, this.dataValues)
  
    // delete some (key, value)
   
    delete object.createdAt

    delete object.homeworkId
    delete object.examId
    delete object.workBookId
    delete object.workPaperId
    delete object.problemId
    delete object.studentId
    delete object.collectionId
    delete object.workBookRecordId

    return object
  }
  

}