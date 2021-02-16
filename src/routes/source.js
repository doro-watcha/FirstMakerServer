import { Router }  from 'express'

import { sourceController } from '../controllers'


var router = new Router()


router.post('/', (req,res) => {
  sourceController.create(req,res)
})

router.get('/' , (req,res) => {
  sourceController.listSources(req,res)
})

module.exports = router