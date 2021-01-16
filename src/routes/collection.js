var express = require('express');

import { collectionController } from '../controllers'
import Authenticator from '../Authenticator'
const { authenticate } = Authenticator

var router = express.Router();

router.post('/', authenticate, (req,res) => {
  collectionController.create(req,res)
})

router.get('/', authenticate, (req,res) => {
  collectionController.findList(req,res)
})

router.get('/:id', (req,res) => {
  collectionController.findOne(req,res)
})

router.patch ('/:id' , (req,res) => {
  collectionController.update(req,res)
})

router.delete('/:id', (req,res) => {
  collectionController.delete(req,res)
})


module.exports = router