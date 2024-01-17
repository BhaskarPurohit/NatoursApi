const express = require("express")
const app = express()

app.get("/",(req,res)=>{
    res.send("server running")
})

app.get('/first',(req,res)=>{
    res.send("hitting the first route")
})

app.get('/sendJSON',(req,res)=>{
    res.json({
        response:"I am a JSON"
    })
})

app.listen(3000, ()=>{
    console.log("app running on port 3000")
})