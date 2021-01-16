import { Router } from 'express'

import { bigChapterController } from '../controllers'


var router = new Router()

router.post('/', (req,res) => {
  bigChapterController.create(req,res)
})

router.get ( '/', (req,res) => {
  bigChapterController.findList(req,res)
})


module.exports = router