const express = require("express")
const fs = require('fs')
const morgan = require('morgan')

const app = express()


//adding middleware
app.use(morgan('dev'))
app.use(express.json())

app.use((req,res,next)=>{  //third argument is next function, we can call it whenever we want
    console.log('Hello from the middleware')
    next()

})

app.use((req, res, next)=>{
    req.requestTime = new Date().toISOString()
    next()
})



const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

//defining callback functions for route handlers
const getAllTours= (req,res)=>{
    console.log(req.requestTime);
    res.status(200).json({
        status:'success',
        results: tours.length,
        data:{
            tours:tours
        }
    })
}

const getToursById = (req, res)=>{
    console.log(req.params);
    const id = req.params.id *1; //* converts to number
    const tour = tours.find(el => el.id === id)


    if(!tour){
        return res.status(404).json({
            status: 'fail',
            message:'Invalid'
        })
    }

    // console.log(tour);
    res.json({
        status:'successfully sent',
        data:{
            tour
        }
    })
}


const postTours = (req, res)=>{
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
    


    }

const patchToursById = (req,res)=>{
    const id = req.params.id * 1
    const tour = tours.find(el=> el.id === id)
    if(!tour){
        return res.status(404).json({
            status:'failed',
            message: 'not found'
        })
    }
    res.status(200).json({
        status: 'patch success',
        data:{
            tour:'<Updated tour here>'
        }
    })
}


const deleteToursById = (req, res)=>{
    const id = req.params.id * 1
    const tour = tours.find(el=> el.id == id)
    if(!tour){
        res.status(404).json({
            status:'failed',
            message:'can not delete a non existent entry'
        })
    }

    res.status(204).json({  //status 204 does not send any content
        status:'deleted successfully',
        data:null
    })
}
//adding a methods
// app.get('/api/v1/tours',getAllTours)

// app.get('/api/v1/tours/:id',getToursById)

// app.post('/api/v1/tours',postTours)

// app.patch('/api/v1/tours/:id',patchToursById)

// app.delete('/api/v1/tours/:id',deleteToursById)


//defining by routes
app.route('/api/v1/tours').get(getAllTours).post(postTours)

app.route('/api/v1/tours/:id').get(getToursById).patch(patchToursById).delete(deleteToursById)


//start the server
app.listen(3000, ()=>{
    console.log("app running on port 3000")
})