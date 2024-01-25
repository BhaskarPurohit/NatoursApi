const fs = require('fs')

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

exports.getAllTours = (req,res)=>{
    console.log(req.requestTime);
    res.status(200).json({
        status:'success',
        results: tours.length,
        requestedAt: req.requestTime,
        data:{
            tours
        }
    })
}

exports.getTour= (req,res)=>{
    console.log(req.params)
    const id = req.params.id *1

    const tour = tours.find(el => el.id === id)

    // const tour = tours.find(el => el.id === req.params) //contains only the element in which the condition el.id === req.params is met
    if(id > tours.length){
        return res.status(404).json({
            status: 'failed',
            message:'id not found in the database'
        })
    }
    
        res.status(200).json({
            status:'success',
            data:{
                tour
            }
        })
    
}

exports.createTour = (req, res)=>{
    const newId = tours[tours.length -1].id + 1
    const newTour = Object.assign({id: newId}, req.body)

    tours.push(newTour)

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err=> {
         res.status(201).json({  // 201 is status for Created, 200 is for OK
            status: 'success',
            data:{
                tour: newTour
            }
         })
        
    })
}

exports.updateTour = (req,res)=>{
    if(req.params.id *1 > tours.length){
        res.status(404).json({
            status:'failed!',
            message:'Invalid id'
        })
    }
    res.status(200).json({
        status:'success',
        data:{
            tour:'<Updated tour here..>'
        }
    })
}

exports.deleteTour = (req,res)=>{
    if(req.params.id *1 > tours.length){
        res.status(404).json({
            status:'failed!',
            message:'Invalid id'
        })
    }
    res.status(204).json({
        status: 'success',
        data: null
    })
}