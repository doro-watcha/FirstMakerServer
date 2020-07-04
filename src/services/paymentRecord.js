import { PaymentRecord, User } from  '../models'

let instance = null

class PaymentRecordService {


  constructor() {
		if (!instance) {
			console.log('PaymentRecord Service 생성' + this)
			instance = this
		}
		return instance
  }

  async create ( modelObj ){
    const { userId } = modelObj

    const user = await User.findOne({
      where : { id : userId }
    })

    if ( user == null ) throw Error ('USER_NOT_FOUND')
    else {

      return await PaymentRecord.create(modelObj)
    }

  }

  async findList (userId) {
    return await PaymentRecord.findAll({
      where : { userId }
    })
  }

  async findOne ( id ) {
    return await PaymentRecord.findOne({
      where : {id}
    })
  }

  async update ( id , modelObj) {
    
    await PaymentRecord.update(modelObj, {
      where: { id }
    })

    const updatePaymentRecord = await PaymentRecord.findOne({
        where: { id },
    })
    if (updatePaymentRecord === null) throw Error('PAYMENT_RECORD_NOT_FOUND')

    return updatePaymentRecord
  }

  async delete ( id ) {

    const paymentRecord = await PaymentRecord.findOne({
			where: {
				id
			}
        })
      
      if ( paymentRecord == null ) {
          throw Error ('PAYMENT_RECORD_NOT_FOUND')
      } else {
          await paymentRecord.destroy()
      }

  }

}

export default new PaymentRecordService()