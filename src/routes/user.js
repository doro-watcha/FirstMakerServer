var express = require('express');

import { userController } from '../controllers'


var router = express.Router();

router.get('/:id', (req,res) => {
  userController.findUser(req,res)
})

router.patch('/:id', (req, res) => {
  userController.updateUser(req,res)
})

router.delete('/:id', (req, res) => {
  userController.deleteUser(req,res)
})

module.exports = router
