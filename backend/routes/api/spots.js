const express = require("express")
const asyncHandler = require("express-async-handler")


const {Spot} = require ("../../db/models")
const {Image} = require ("../../db/models")

const router = express.Router()

router.get('/', asyncHandler(async(req,res) => {
    const spots = await Spot.findAll({
        include: Image,
        order: [
            ['id', 'DESC']
        ]
    })
    return res.json(spots)
}))

router.post("/", asyncHandler(async(req,res) => {
    // console.log(req.body)
    const spot = await Spot.create(req.body)
    console.log(spot.dataValues.id)
    return res.json(spot)
}))

router.get('/:id', asyncHandler(async(req,res) => {
    const id = req.params.id
    const spots = await Spot.findByPk(id, {
        include: Image,

    })
    return res.json(spots)
}))

router.delete('/:id', asyncHandler(async(req,res) =>{
    const id = req.params.id
    const spot = await Spot.findByPk(id)
    spot.destroy()

}))

module.exports = router
