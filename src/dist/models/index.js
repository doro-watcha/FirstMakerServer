"use strict";

var _sequelize = _interopRequireDefault(require("sequelize"));

var _dbConfig = _interopRequireDefault(require("../config/db-config"));

var _University = _interopRequireDefault(require("./University"));

var _Score = _interopRequireDefault(require("./Score"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const env = process.env.NODE_ENV || 'development';
const config = _dbConfig.default[env];
const sequelize = new _sequelize.default(config.database, config.username, config.password, config);
const models = {
  University: _University.default.init(sequelize, _sequelize.default),
  Score: _Score.default.init(sequelize, _sequelize.default)
};
Object.values(models);
module.exports = { ...models,
  sequelize,
  Sequelize: _sequelize.default
};