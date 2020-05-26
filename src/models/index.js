import Sequelize from 'sequelize'
import dbConfig from '../config/config.js'

import UniversityModel from './University'

const env = process.env.NODE_ENV || 'development'
const config = dbConfig[env]
const sequelize = new Sequelize(config.database, config.username, config.password, config)


const models = {
  University : UniversityModel.init(sequelize, Sequelize)
}

Object.values(models)

module.exports = {
  ...models,
  sequelize,
  Sequelize
}