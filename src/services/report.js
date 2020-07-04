import { Report , University , User } from '../models'

let instance = null

class ReportService {

    constructor() {
		if (!instance) {
			console.log('Report Service 생성' + this)
			instance = this
		}
		return instance
    }
    
    async create ( modelObj) {
        return await Report.create(modelObj)
    }

    async findOne (id) {
        return await Report.findOne({
            where : { id }
        })
    }

    async findAll () {


		let options = {
            attributes : ['id','score'],
			include: [
				{
					model: University,
					as: 'university',
				},
				{
					model: User,
					as: 'user',
				},
			],
        }


        return await Report.findAll(options)
    }

    

    async update ( id , report) {

        await Report.update(report, {
            where: { id },
        })

        const updateReport = await Report.findOne({
            where: { id },
        })
        if (updateReport === null) throw Error('REPORT_NOT_FOUND')

        return updateReport

    }

    async delete ( id ) {

		const report = await Report.findOne({
			where: {
				id
			}
        })
        
    if ( report == null ) {
        throw Error ('REPORT_NOT_FOUND')
    } else {
        await report.destroy()
    }
  }
}

export default new ReportService()