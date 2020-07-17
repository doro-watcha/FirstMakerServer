import mime from 'mime'
import path from 'path'
import fs from 'fs'
import xlsx from 'xlsx'

let instance = null

class FileService {

    constructor() {
		if (!instance) {
			console.log('File Service 생성' + this)
			instance = this
		}
		return instance
  }

  async majorParse ( modelObj ) {

    
  }

}


export default new FileService()