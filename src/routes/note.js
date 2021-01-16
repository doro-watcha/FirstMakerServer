var express = require('express');
import Authenticator from '../Authenticator'

const { authenticate } = Authenticator
import { noteController } from '../controllers'


var router = express.Router();

router.post('/', (req,res) => {
  noteController.create(req,res)
})

router.get('/list/wrong' , authenticate,  (req,res) => {
  noteController.findWrongList(req,res)
})

router.get('/list/star' , authenticate , (req,res) => {
  noteController.findStarList(req,res)
})

router.get('/list/long', authenticate, (req,res) => {
  noteController.findLongList(req,res)
})

router.get ( '/', authenticate,  (req,res) => {
  noteController.findList(req,res)
})

router.patch('/', (req,res)=> {
  noteController.update(req,res)
})

router.get( '/:id' , (req,res) => {
  noteController.findOne(req,res)
})





module.exports = router