const express = require('express')
const router = express.Router()
const fs = require('fs')
const tourController = require('../controllers/tourController')

router.param('id',tourController.checkID)

//create a checkbody middleware function and check if the body has name and price proeprty
//if yes then send
//if no then send 400
//Add it to the post handler stack
const middleware=()=>{

}


router
.route('/')
.get(tourController.getAllTours)
.post(tourController.checkBody, tourController.createTour) //chaining 2 different middlewares


router
.route('/:id')
.get(tourController.getTour)
.patch(tourController.updateTour)
.delete(tourController.deleteTour)

module.exports = router