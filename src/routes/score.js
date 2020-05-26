import { scoreController } from '../controllers'
import express from 'express'

var router  = express.Router()

router.get('/', function(req,res) {
    scoreController.getScore(req, res)
})

router.post('/', function(req, res) {
    scoreController.setScore(req,res)
})


module.exports = router
