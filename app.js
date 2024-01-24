const express = require('express')
const app = express()
const PORT = 3010
app.get('/',(req,res)=>{
    res.status(200).json({message:'hello from server',
    app:"Natours"    
})
})

app.post('/tours',(req,res)=>{
    res.status(200).send("post req made")
})

app.listen(PORT, ()=>{
    console.log('running on port ',PORT)
})

