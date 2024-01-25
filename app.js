const { create } = require('domain')
const express = require('express')
const morgan = require('morgan')
const app = express()
const PORT = 3010


const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

app.use(morgan('dev'))
app.use(express.json()) //middleware

app.use((req,res,next)=>{
    console.log('middlewars')
    next()
})

//Mounting the router
app.use('/api/v1/users',userRouter)

app.listen(PORT, ()=>{
    console.log('running on port ',PORT)
})

