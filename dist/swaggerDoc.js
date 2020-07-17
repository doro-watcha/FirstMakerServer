"use strict";

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));

var _University = require("./models/University");

var _Score = require("./models/Score");

var _Major = require("./models/Major");

var _User = require("./models/User");

var _Report = require("./models/Report");

var _PaymentRecord = require("./models/PaymentRecord");

var _Consulting = require("./models/Consulting");

var _MajorData = require("./models/MajorData");

var _Academy = require("./models/Academy");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  academyId: {
    name: 'academyId',
    in: 'query',
    description: '학원 id별 조회',
    shcema: {
      type: 'integer'
    }
  },
  userId: {
    name: 'userId',
    in: 'query',
    description: '유저 id별 조회',
    shcema: {
      type: 'integer'
    }
  },
  majorId: {
    name: 'majorId',
    in: 'query',
    description: '학과 id별 조회',
    schema: {
      type: 'integer'
    }
  },
  location: {
    name: 'location',
    in: 'query',
    description: '대학 위치',
    schema: {
      type: 'string'
    }
  },
  group: {
    name: 'group',
    in: 'query',
    description: '모집 군별',
    schema: {
      type: 'string'
    }
  },
  line: {
    name: 'line',
    in: 'query',
    description: '인문/자연/예체능',
    schema: {
      type: 'string'
    }
  },
  recruitmentType: {
    name: 'recruitmentType',
    in: 'query',
    description: '모집 전형',
    schema: {
      type: 'string'
    }
  },
  univName: {
    name: 'univName',
    in: 'query',
    description: '대학 이름',
    schema: {
      type: 'string'
    }
  },
  recruitmentUnit: {
    name: 'recruitmentUnit',
    in: 'query',
    description: '모집 단위',
    schema: {
      type: 'string'
    }
  },
  majorName: {
    name: 'majorName',
    in: 'query',
    description: '세부 전공',
    schema: {
      type: 'string'
    }
  },
  year: {
    name: 'year',
    in: 'query',
    description: '년도',
    schema: {
      type: 'integer'
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
        Score: _Score.schema,
        Major: _Major.schema,
        User: _User.schema,
        Report: _Report.schema,
        PaymentRecord: _PaymentRecord.schema,
        Consulting: _Consulting.schema,
        MajorData: _MajorData.schema,
        Academy: _Academy.schema
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
  apis: ['./src/routes/*.js']
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