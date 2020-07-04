
var express = require('express');

import { universityController } from '../controllers'


var router = express.Router();



router.get('/', function(req, res) {
    universityController.findList(req, res)
})


router.post('/', (req,res) => {
    universityController.createUniversity(req,res)
})

router.patch('/:id', (req,res) => {
    universityController.updateUniversity(req,res)
})

router.delete('/:id', (req,res) => {
    universityController.deleteUniversity(req,res)
})

module.exports = router
