const express = require("express")
const app = express()
const fs = require('fs')

//adding middleware
app.use(express.json())

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

//adding a get method
app.get('/api/v1/tours',(req,res)=>{
    res.status(200).json({
        status:'success',
        results: tours.length,
        data:{
            tours:tours
        }
    })
})

//adding a post method
app.post('/api/v1/tours',(req, res)=>{
    const newId = tours[tours.length-1].id + 1
    const newTour = Object.assign({id: newId}, req.body)
    tours.push(newTour)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours), error=>{
        res.status(201).json({
            status:'success',
            data:{
                tour: newTour
            }
        })

    })
    


    })


app.listen(3000, ()=>{
    console.log("app running on port 3000")
})