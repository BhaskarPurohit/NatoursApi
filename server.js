const app = require('./app')
const dotenv = require('dotenv')

dotenv.config({path: './config.env'})

console.log(process.env)

const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log('running on port ',PORT)
})