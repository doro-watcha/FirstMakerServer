var express = require('express');
import Authenticator from '../Authenticator'

const { authenticate } = Authenticator
import { blackListController } from '../controllers'


var router = express.Router();

router.post('/', (req,res) => {
  blackListController.create(req,res)
})

router.get ( '/', authenticate,  (req,res) => {
  blackListController.findList(req,res)
})

router.patch('/', (req,res)=> {
  blackListController.update(req,res)
})

router.get( '/:id' , (req,res) => {
  blackListController.findOne(req,res)
})





module.exports = router