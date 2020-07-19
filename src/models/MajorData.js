import Sequelize from 'sequelize'

export default class MajorData extends Sequelize.Model {


    static init(sequelize) {
        return super.init(
            {
              year : {
                type : Sequelize.INTEGER,
                defaultValue : 0
              },
              // metadata = initialMember , additionalMember , competitionRate, reflectionSubject, tamguNumber , applicationIndicator, extraPoint,
              metadata : {
                type : Sequelize.JSON,
                allowNull : true
              },
              prediction : {
                type : Sequelize.JSON,
                allowNull : true,
              },
              ratio : {
                type : Sequelize.JSON,
                allowNull : true
              },
              gradeToScore : {
                type : Sequelize.JSON,
                allowNull : true
              }
            },
            {
              sequelize 
            },
        )
      }

      static associate(models) {
        this.belongsTo(models.Major, {
          foreignKey: 'majorId',
          as: 'major',
        }),
        this.hasMany(models.Report, {
          foreignKey : 'majorDataId',
          as : 'report'
        })
      }


		toJSON() {
			const object = Object.assign({}, this.dataValues)
		
			// delete some (key, value)
		 
			delete object.createdAt
      delete object.updatedAt
      delete object.majorId
	
			
			return object
		}
}


// swagger schema
export const schema = {
  type: 'object',
    properties: {
    id: {
      type: 'integer',
      example: 3,
    },
    year : {
      type : 'integer',
      exammple : 2020
    },
    metadata : {
      type : 'json',
      example : {
        initialMember : 3,
        additionalMember : 4,
        competitionRate : 4.3,
        reflectionSubject : '국수영사',
        tamguNumber : 3,
        applicationIndicator : '백분위',
        extraPoint : '수가10퍼센트 더준다고~'
      }
    },
    prediction : {
      type : 'json',
      example : {
        strong : 600.3,
        safe : 603.4,
        dangerous : 234.3,
        sniping : 234.3
      }
    },
    ratio : {
      type : 'json',
      example : {
        korean : 40,
        englsih : 30,
        math : 40,
        tamgu : 20,
        foreign : 30,
        history : 40
      }
    },
    gradeToScore : {
      type : 'json',
      example : {
        englsih : {
          way : '수능반영비율',
          score : [1,2,3,4,5,6,6,6]
        },
        history : {
          way : '수능반영비율',
          score : [1,2,3,4,5,5,5,5]
        }
      }
    }

  }
}