import Sequelize from 'sequelize'

export default class Problem extends Sequelize.Model {

  static init(sequelize) {
    return super.init (
      {
          // 문제 Image Url
          problemUrl: {
            type: Sequelize.STRING,
            allowNull : true,
          },
          // 문제의 정답 
          answer: {
            type: Sequelize.STRING,
            allowNull : true,
          },  

          level : {
            type : Sequelize.STRING,
            allowNull : true 
          },
          
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
          },

      },
      {
        sequelize
      },
    )
  }

  static associate(models) {
    this.belongsTo(models.BigChapter, {
      foreignKey: 'bigChapterId',
      as: 'bigChapter'
    }),
    this.belongsTo(models.MiddleChapter, {
      foreignKey : 'middleChapterId',
      as : 'middleChapter'
    }),
    this.belongsTo(models.SmallChapter, {
      foreignKey : 'smallChapterId',
      as : 'smallChapter'
    })
    this.belongsTo(models.Subject,{
      foreingKey : 'subjectId',
      as : 'subject'
    })
    this.hasMany(models.Note, {
      foreignKey : 'problemId',
      as : 'note'
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
