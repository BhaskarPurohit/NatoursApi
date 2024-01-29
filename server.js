const app = require('./app')
const dotenv = require('dotenv')

dotenv.config({path: './config.env'})

console.log(process.env)

const PORT = 3010
app.listen(PORT, ()=>{
    console.log('running on port ',PORT)
})