
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})
const app = require('./app')
const mongoose = require('mongoose')
const DB = process.env.DATABSE.replace('<PASSWORD>', process.env.DATABSE_PASSWORD)

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
    
}).then(con =>{
    console.log(con.connections)
    console.log('DB connection successful!');
})

console.log(process.env)

const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log('running on port ',PORT)
})