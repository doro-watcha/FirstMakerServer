import Sequelize from 'sequelize'

export default class WorkBook extends Sequelize.Model {

  static init(sequelize) {
    return super.init (
      {
        title : {
          type : Sequelize.STRING,
          allowNull : true
        },
        thumbnailUrl : {
          type : Sequelize.STRING,
          allowNull : true 
        },
        publisher : {
          type : Sequelize.STRING,
          allowNull : true 
        }


      },
      {
        sequelize
      }
    )}

    static associate(models) {
      this.hasMany( models.WorkBookRecord,{
  
        foreignKey : 'workBookId',
        as : 'workBookRecords'

      }),
      this.hasMany(models.Problem,{
        foreignKey : 'workBookId',
        as : 'problems'
      }),
      this.belongsTo(models.Subject,{
        foreignKey : 'subjectId',
        as : 'subject'
      })
  
    }


  toJSON() {
    const object = Object.assign({}, this.dataValues)
  
    // delete some (key, value)
   
    delete object.updatedAt
    delete object.createdAt

    delete object.subjectId
    return object
  }


}