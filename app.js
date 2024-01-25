const { create } = require('domain')
const express = require('express')
const morgan = require('morgan')
const app = express()
const PORT = 3010
const fs = require('fs')

app.use(express.json()) //middleware

app.use((req, res, next)=>{
    req.requestTime = new Date().toISOString()
    // console.log(req.requestTime)

    next()
})

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

const apiLink = '/api/v1/tours'




const getAllTours = (req,res)=>{
    console.log(req.requestTime);
    res.status(200).json({
        status:'success',
        results: tours.length,
        requestedAt: req.requestTime,
        data:{
            tours
        }
    })
}

const getTour= (req,res)=>{
    console.log(req.params)
    const id = req.params.id *1

    const tour = tours.find(el => el.id === id)

    // const tour = tours.find(el => el.id === req.params) //contains only the element in which the condition el.id === req.params is met
    if(id > tours.length){
        return res.status(404).json({
            status: 'failed',
            message:'id not found in the database'
        })
    }
    
        res.status(200).json({
            status:'success',
            data:{
                tour
            }
        })
    
}

const createTour = (req, res)=>{
    const newId = tours[tours.length -1].id + 1
    const newTour = Object.assign({id: newId}, req.body)

    tours.push(newTour)

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err=> {
         res.status(201).json({  // 201 is status for Created, 200 is for OK
            status: 'success',
            data:{
                tour: newTour
            }
         })
        
    })
}

const updateTour = (req,res)=>{
    if(req.params.id *1 > tours.length){
        res.status(404).json({
            status:'failed!',
            message:'Invalid id'
        })
    }
    res.status(200).json({
        status:'success',
        data:{
            tour:'<Updated tour here..>'
        }
    })
}

const deleteTour = (req,res)=>{
    if(req.params.id *1 > tours.length){
        res.status(404).json({
            status:'failed!',
            message:'Invalid id'
        })
    }
    res.status(204).json({
        status: 'success',
        data: null
    })
}

// app.get(apiLink,getAllTours)

// app.post(apiLink,createTour)

// app.get(apiLink+'/:id',getTour)

// app.patch(apiLink+'/:id', updateTour)

// app.delete(apiLink+'/:id', deleteTour)

app
.route('/api/v1/tours')
.get(getAllTours)
.post(createTour)


app
.route('/api/v1/tours/:id')
.get(getTour)
.patch(updateTour)
.delete(deleteTour)

app.listen(PORT, ()=>{
    console.log('running on port ',PORT)
})

