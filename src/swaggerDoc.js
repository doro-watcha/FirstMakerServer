import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'

import { schema as University } from './models/University'
import { schema as Score} from './models/Score'
import { schema as Major} from './models/Major'
import { schema as User} from './models/User'
import { schema as Report} from './models/Report'
import { schema as PaymentRecord} from './models/PaymentRecord'
import { schema as Consulting} from './models/Consulting'
import { schema as ReflectionRatio} from './models/ReflectionRatio'
import { schema as Academy } from './models/Academy'

const ApiResponse = {
	type: 'object',
	properties: {
		success: {
			type: 'boolean',
			example: true,
		},
		data: {
			type: 'object',
		},
		ecode: {
			type: 'integer',
			example: 102,
		},
		message: {
			type: 'string',
			example: 'Invalid request',
		},
	},
	required: ['success'],
}

const Error = {
	type: 'object',
	properties: {
		success: {
			type: 'boolean',
			example: false,
		},
		ecode: {
			type: 'integer',
			example: 102,
		},
		message: {
			type: 'string',
			example: 'Invalid request',
		},
	},
	required: ['success', 'ecode', 'message'],
}

const parameters = {
	page: {
		name: 'page',
		in: 'query',
		description: 'default = 1, min = 1',
		schema: {
			type: 'integer',
		},
	},
	limit: {
		name: 'limit',
		in: 'query',
		description: 'default = 10, min = 1, max = 50',
		schema: {
			type: 'integer',
		},
	},
	sinceId: {
		name: 'sinceId',
		in: 'query',
		description: 'min = 0',
		schema: {
			type: 'integer',
		},
	},
	maxId: {
		name: 'maxId',
		in: 'query',
		description: 'min = 0',
		schema: {
			type: 'integer',
		},
	},
	orderBy: {
		name: 'orderBy',
		in: 'query',
		description: "default = 'desc', valid = ['asc', 'desc']",
		schema: {
			type: 'string',
		},
	},
}

const options = {
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			title: 'DAEHAKGA API',
			version: '2.0.0',
		},
		components: {
			schemas: {
				University,
				Score,
				Major,
				User,
				Report,
				PaymentRecord,
				Consulting,
				ReflectionRatio,
				Academy
			},
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
			parameters,
		},
	},
	basePath: '/',
	apis: ['./src/routes/*.js'],
}

const specs = swaggerJsDoc(options)

const uiOptions = {
	swaggerOptions: {
		supportedSubmitMethods: [],
	},
}

module.exports = (app) => {
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, uiOptions))
}

