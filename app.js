const { create } = require('domain')
const express = require('express')
const morgan = require('morgan')
const app = express()


const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

app.use(morgan('dev'))
app.use(express.json()) //middleware

app.use(express.static(`${__dirname}/public`))

app.use((req,res,next)=>{
    console.log('middlewars')
    next()
})

//Mounting the router
app.use('/api/v1/users',userRouter)
app.use('/api/v1/tours',tourRouter)

module.exports = app

