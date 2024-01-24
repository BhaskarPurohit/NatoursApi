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
    console.log(req.body)
    res.status(200).send("Done")
})

app.listen(PORT, ()=>{
    console.log('running on port ',PORT)
})

