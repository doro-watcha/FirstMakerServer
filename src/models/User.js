import Sequelize from 'sequelize'
import bycrypt from 'bcrypt'

export default class User extends Sequelize.Model {

  static init(sequelize) {
    return super.init (
      {
          // 이름 
          name: {
            type: Sequelize.STRING,
            allowNull : true,
          },
          email : {
            type : Sequelize.STRING,
            allowNull : true 
          },
          password : {
            type : Sequelize.STRING,
            allowNull : true 
          },
          school : {
            type : Sequelize.STRING,
            allowNull : true 
          },
          grade : {
            type : Sequelize.STRING,
            allowNull : true 
          },
          mathGrade : {
            type : Sequelize.STRING,
            allowNull : true 
          },
          type : {
            type : Sequelize.STRING,
            allowNull : true 
          }

      },
      {
        sequelize 
      }
    )
  }

  static hashPassword(unencryptedPwd) {
    return bycrypt.hashSync(unencryptedPwd, 8)
  }

  isValidPassword(unencryptedPwd) {
    return bycrypt.compareSync(unencryptedPwd, this.password)
  }	

  static associate(models) {

  }
  static associate(models) {
    this.hasMany(models.Homework, {
      foreignKey : 'userId',
      as : 'homework'
    })
  }

  toJSON() {
    const object = Object.assign({}, this.dataValues)
  
    // delete some (key, value)
   
    delete object.createdAt
    delete object.updatedAt
    delete object.password


    return object
  }
  
}