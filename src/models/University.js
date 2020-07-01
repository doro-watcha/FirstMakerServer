import Sequelize from 'sequelize'

export default class University extends Sequelize.Model {

	//연도, 계열, 모집군, 전형, 경쟁률, 최초 모집인원, 수시이월 인원, 최종 모집인원, 내신반영 유무, 특이사항, 비고


    static init(sequelize) {
        return super.init (
          {
						// 연도
						year : {
							type : Sequelize.INTEGER,
							defaultValue : 2020
						},
						// 계열
            line: {
							type: Sequelize.INTEGER,
							defaultValue: 0,
						},
						// 군별
						group: {
							type: Sequelize.INTEGER,
							defaultValue: 0,
						},
						// 모집 전형
						admissionType : {
							type : Sequelize.STRING,
							allowNull : true
						},
						// 모집 인원
						recruitmentNumber : {
							type : Sequelize.INTEGER,
							defaultValue : 0
						},
						// 수시이월 인원
						additionalMember : {
							type : Sequelize.INTEGER,
							defaultValue : 0 
						},
						// 최종 모집인원
						finalNumber : {
							type : Sequelize.INTEGER,
							defaultValue : 0
						},
						// 경쟁률
						competitionNumber : {
							type : Sequelize.FLOAT,
							allowNull : true
						},
						// 내신 반영 유무
						isNaesinIncluded : {
							type : Sequelize.BOOLEAN,
							defaultValue : false
						},
						name: {    
							type: Sequelize.STRING,
							allowNull : true,
						},
						major: {
							type: Sequelize.STRING,
							allwoNull: true,
						},
						majorCode: {
							type: Sequelize.INTEGER,
							defaultValue: -1,
						},
						strong_val: {
							type : Sequelize.FLOAT,
							allowNull : true,
						},
						safe_val: {
							type : Sequelize.FLOAT,
							allowNull : true,
						},
						dangerous_val: {
							type : Sequelize.FLOAT,
							allowNull : true,
						},
						sniping_val : {
							type : Sequelize.FLOAT,
							allowNull : true,
						},
						somethingSpecial : {
							type : Sequelize.STRING,
							allowNull : true
						},
						etc : {
							type : Sequelize.STRING,
							allowNull : true
						},
						createdAt: {
							type: Sequelize.DATE,
							allowNull: true,
							defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
						},
						updatedAt: {
							type: Sequelize.DATE,
							allowNull: true,
							defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
							onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
						},
                

            },
            {
                sequelize,
            },
        )
		}
		

		static associate(models) {
			this.hasMany(models.Report, {
				foreignKey: 'universityId',
				as: 'report'
			})
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
			example : 2020
		},
		line: {
			type: 'integer',
			example: 0,
		},
		group: {
			type: 'integer',
			example: '0',
		},
		admissionType : {
			type : 'string',
			example : '기회균등전형'
		},
		recruitmentNumber : {
			type : 'integer',
			example : '35'
		},
		additionalMember : {
			type : 'integer',
			example : '3'
		},
		finalNumber : {
			type : 'integer',
			example : '38'
		},
		competitionNumber : {
			type : 'float',
			example : 3.5
		},
		isNaesinIncluded : {
			type : 'boolean',
			example : false
		},

		name: {
			type: 'string',
      example: '고려대',
		},
		major: {
			type: 'string',
			example: '간호대학',
		},
		majorCode: {
			type: 'integer',
			example: 35,
		},
		strong_val: {
			type: 'float',
			example : 690.5
		},
		safe_val:{
			type: 'float',
			example : 685.5
		},
		dangerous_val:{
			type: 'float',
			example : 680.6
		},
		sniping_val:{
			type: 'float',
			example : 665.5
		},
		somethingSpecial : {
			type : 'string',
			example : '개발하기 너무 싫다'
		},
		etc : {
			type : 'string',
			example : '리얼로다가'
		}
		
	},
	required: ['major', 'name'],
}
