const express = require('express')

const router = express.Router()

const getAllUsers = (req,res)=>{
    res.status(500).json({
        status:'error',
        message:"route not yet defined"
    })
}

const createUsers = (req,res)=>{
    res.status(500).json({
        status:'error',
        message:"route not yet defined"
    })
}

const getUser = (req, res)=>{
    res.status(500).json({
        status:'error',
        message:"route not yet defined"
    })
}

const updateUser = (req, res)=>{
    res.status(500).json({
        status:'error',
        message:"route not yet defined"
    })
}

const deleteUser = (req, res)=>{
    res.status(500).json({
        status:'error',
        message:"route not yet defined"
    })
}

router.route('/').get(getAllUsers).post(createUsers)

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

module.exports = router