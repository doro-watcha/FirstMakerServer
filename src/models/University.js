import Sequelize from 'sequelize'

export default class University extends Sequelize.Model {


    static init(sequelize) {
        return super.init (
            {
            line: {
							type: Sequelize.INTEGER,
							allowNull: false,
						},
						group: {
							type: Sequelize.INTEGER,
							allowNull: false,
						},
						name: {    
							type: Sequelize.STRING,
							allowNull : false,
						},
						major: {
							type: Sequelize.STRING,
							allwoNull: false,
						},
						majorCode: {
							type: Sequelize.INTEGER,
							defaultValue: -1,
						},
						strong_val: {
							type : Sequelize.FLOAT,
												allowNull : false,
						},
						safe_val: {
							type : Sequelize.FLOAT,
												allowNull : false,
						},
						dangerous_val: {
							type : Sequelize.FLOAT,
												allowNull : false,
										},
										sniping_val : {
												type : Sequelize.FLOAT,
												allowNull : false,
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
                sequelize,
            },
        )
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
		line: {
			type: 'integer',
			example: 0,
		},
		group: {
			type: 'string',
			example: '0',
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
		}
		
	},
	required: ['major', 'name'],
}
