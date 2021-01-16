
import sequelize from 'sequelize'

import { WorkPaper,Note , Problem, BigChapter, MiddleChapter, SmallChapter } from '../models'

let instance = null

class WorkPaperService {
	constructor() {
		if (!instance) {
			console.log('WorkPaperService 생성' + this)
			instance = this
		}
		return instance
	}

	async create(modelObj) {
    await WorkPaper.create(modelObj)
    
    const newWorkPaper = WorkPaper.findOne({
      where : modelObj
    })

    return newWorkPaper
  }

  async findList ( where ) {

    return await WorkPaper.findAll({
      where : JSON.parse(JSON.stringify(where)),
      include :[
        {
            model: Note,
            as : 'note',
            include : [
                {
                    model : Problem,
                    as : 'problem',
                    include : [
                      {
                        model : BigChapter,
                        as : 'bigChapter'
                      },
                      {
                        model : MiddleChapter,
                        as : 'middleChapter'
                      },
                      {
                        model : SmallChapter,
                        as : 'smallChapter'
                      }
                    ]
                }
            ]
        }
      ]
    })
  }

  async findOne ( where ) {

    return await WorkPaper.findOne({
      where : JSON.parse(JSON.stringify(where)),
      include :[
        {
            model: Note,
            as : 'note',
            include : [
                {
                    model : Problem,
                    as : 'problem',
                    include : [
                      {
                        model : BigChapter,
                        as : 'bigChapter'
                      },
                      {
                        model : MiddleChapter,
                        as : 'middleChapter'
                      },
                      {
                        model : SmallChapter,
                        as : 'smallChapter'
                      }
                    ]
                }
            ]
        }
      ]
    })
  }

	async delete ( id ) {

		const workPaper = await WorkPaper.findOne({where: id})
        
    if ( workPaper == null ) {
        throw Error ('WORK_PAPER_NOT_FOUND')
    } else {
        await workPaper.destroy()
    }
	}
  

  async update ( id, modelObj ) {

    await WorkPaper.update(modelObj,{
      where : { id }
    })

    const workPaper = await WorkPaper.findOne({id})

    if ( workPaper == null ) throw Error('WORK_PAPER_NOT_FOUND')

    return workPaper

  }


}

export default new WorkPaperService()