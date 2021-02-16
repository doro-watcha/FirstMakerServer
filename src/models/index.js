import Sequelize from 'sequelize'
import dbConfig from '../config/db-config'
import ProblemModel from './Problem'
import ExamModel from './Exam'
import HomeworkModel from './Homework'
import ClassModel from './Class'
import ClassBelongsModel from './ClassBelongs'
import SubjectModel from './Subject'
import BigChapterModel from './BigChapter'
import MiddleChapterModel from './MiddleChapter'
import SmallChapterModel from './SmallChapter'
import UserModel from './User'
import StudentModel from './Student'
import TeacherModel from './Teacher'
import NoteModel from './Note'
import CollectionModel from './Collection'
import WorkBookModel from './WorkBook'
import WorkBookRecordModel from './WorkBookRecord'
import WorkPaperModel from './WorkPaper'
import BlackListModel from './BlackList'
import SourceModel from './Source'


const env = process.env.NODE_ENV || 'development'
const config = dbConfig[env]
const sequelize = new Sequelize(config.database, config.username, config.password, config)


const models = {
  Problem : ProblemModel.init(sequelize, Sequelize),
  Exam : ExamModel.init(sequelize,Sequelize),
  Homework : HomeworkModel.init(sequelize,Sequelize),
  Class : ClassModel.init(sequelize, Sequelize),
  ClassBelongs : ClassBelongsModel.init(sequelize, Sequelize),
  Subject : SubjectModel.init(sequelize, Sequelize),
  BigChapter : BigChapterModel.init(sequelize, Sequelize),
  MiddleChapter : MiddleChapterModel.init(sequelize, Sequelize),
  SmallChapter : SmallChapterModel.init(sequelize, Sequelize),
  User : UserModel.init(sequelize, Sequelize),
  Student : StudentModel.init(sequelize, Sequelize),
  Teacher : TeacherModel.init(sequelize, Sequelize),
  Note : NoteModel.init(sequelize, Sequelize),
  Collection : CollectionModel.init(sequelize, Sequelize),
  WorkBook : WorkBookModel.init(sequelize, Sequelize),
  WorkBookRecord : WorkBookRecordModel.init(sequelize, Sequelize),
  WorkPaper : WorkPaperModel.init(sequelize, Sequelize),
  BlackList : BlackListModel.init(sequelize, Sequelize),
  Source : SourceModel.init(sequelize, Sequelize)

}

Object.values(models)
	.filter((model) => typeof model.associate === 'function')
  .forEach((model) => model.associate(models))
  

module.exports = {
  ...models,
  sequelize,
  Sequelize
}