"use strict";

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));

var _University = require("./models/University");

var _Score = require("./modesl/Score");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

const ApiResponse = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: true
    },
    data: {
      type: 'object'
    },
    ecode: {
      type: 'integer',
      example: 102
    },
    message: {
      type: 'string',
      example: 'Invalid request'
    }
  },
  required: ['success']
};
const Error = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: false
    },
    ecode: {
      type: 'integer',
      example: 102
    },
    message: {
      type: 'string',
      example: 'Invalid request'
    }
  },
  required: ['success', 'ecode', 'message']
};
const parameters = {
  page: {
    name: 'page',
    in: 'query',
    description: 'default = 1, min = 1',
    schema: {
      type: 'integer'
    }
  },
  limit: {
    name: 'limit',
    in: 'query',
    description: 'default = 10, min = 1, max = 50',
    schema: {
      type: 'integer'
    }
  },
  sinceId: {
    name: 'sinceId',
    in: 'query',
    description: 'min = 0',
    schema: {
      type: 'integer'
    }
  },
  maxId: {
    name: 'maxId',
    in: 'query',
    description: 'min = 0',
    schema: {
      type: 'integer'
    }
  },
  orderBy: {
    name: 'orderBy',
    in: 'query',
    description: "default = 'desc', valid = ['asc', 'desc']",
    schema: {
      type: 'string'
    }
  }
};
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'DAEHAKGA API',
      version: '2.0.0'
    },
    components: {
      schemas: {
        University: _University.schema,
        Score: _Score.schema
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      parameters
    }
  },
  basePath: '/',
  apis: ['./routes/*.js']
};
const specs = (0, _swaggerJsdoc.default)(options);
const uiOptions = {
  swaggerOptions: {
    supportedSubmitMethods: []
  }
};

module.exports = app => {
  app.use('/api-docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(specs, uiOptions));
};