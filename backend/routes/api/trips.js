const express = require("express")
const asyncHandler = require("express-async-handler")


const {Spot} = require ("../../db/models")
const {Trip} = require ("../../db/models")

const router = express.Router()

router.get('/', asyncHandler(async(req,res) => {
    const trips = await Trip.findAll({
        include: Spot,
        order: [
            ['id', 'DESC']
        ]
    })
    return res.json(trips)
}))

router.get('/:id', asyncHandler(async(req,res) => {
    const id = req.params.id
    const trips = await Trip.findByPk(id, {
    })
    return res.json(trips)
}))

router.post('/', asyncHandler(async(req,res)=>{
    const trip = await Trip.create(req.body)
    return res.json(trip)
}))

router.delete('/:id', asyncHandler(async(req,res) => {
    const id = req.params.id
    const trip = await Trip.findByPk(id)
    trip.destroy()

    return res.json(trip)
}))

module.exports = router;
