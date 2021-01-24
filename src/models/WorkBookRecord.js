import Sequelize from 'sequelize'

export default class WorkBookRecord extends Sequelize.Model {

  static init(sequelize) {
    return super.init (
      {
        title : {
          type : Sequelize.STRING,
          allowNull : true
        }

      },
      {
        sequelize
      }
    
    )}


    static associate(models) {
      this.belongsTo( models.Student,{
  
        foreignKey : 'studentId',
        as : 'student'

      }),
      this.belongsTo(models.WorkBook,{
        foreignKey : 'workBookId',
        as : 'workBook'
      }),
      this.belongsTo(models.BigChapter,{
        foreignKey : 'bigChapterId',
        as : 'bigChapter'
      }),
      this.belongsTo(models.Subject, {
        foreignKey : 'subjectId',
        as : 'subject'
      })
      this.hasMany(models.Note,{
        foreignKey : 'workBookRecordId',
        as : 'notes'
      })
  
    }

    toJSON() {
      const object = Object.assign({}, this.dataValues)
    
      // delete some (key, value)
     
      delete object.createdAt
      delete object.updatedAt
      delete object.studentId
      delete object.workBookId
  
      return object
    }


}

