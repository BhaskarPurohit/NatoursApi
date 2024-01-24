const express = require('express')
const app = express()
const PORT = 3010
const fs = require('fs')

app.use(express.json()) //middleware

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))


app.get('/api/v1/tours',(req,res)=>{
    res.status(200).json({
        status:'success',
        results: tours.length,
        data:{
            tours
        }
    })
})

app.post('/api/v1/tours',(req, res)=>{
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
})

app.get('/api/v1/tours/:id',(req,res)=>{
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
    
})

app.listen(PORT, ()=>{
    console.log('running on port ',PORT)
})

