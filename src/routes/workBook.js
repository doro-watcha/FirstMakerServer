import { Router }  from 'express'

import { workBookController } from '../controllers'


var router = new Router()


router.post('/', (req,res) =>{
  console.log("zxcv")
  workBookController.create(req,res)
})

router.post('/buy', (req,res) => {
  workBookController.buy(req,res)
})

router.get('/:id', (req,res) => {
  workBookController.findOne(req,res)
})

router.get('/', (req,res) => {
  workBookController.findList(req,res)
})

router.get('/myChapter/list' , (req,res) => {
  workBookController.findMyChapterList(req,res)
})


router.patch('/:id', (req, res) => {
  workBookController.update(req,res)
})

router.delete('/:id', (req, res) => {
  workBookController.delete(req,res)
})


module.exports = router