const express = require("express")
const app = express()

app.get('/api/v1/tours',(req,res)=>{
    res.status(200).json()
})

app.listen(3000, ()=>{
    console.log("app running on port 3000")
})