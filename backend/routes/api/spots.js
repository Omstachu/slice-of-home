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
router.get('/:id', asyncHandler(async(req,res) => {
    const id = req.params.id
    const spots = await Spot.findByPk(id, {
        include: Image,

    })
    return res.json(spots)
}))
router.post("/", asyncHandler(async(req,res) => {
    console.log(req.body)
    const spot = await Spot.create(req.body)
    res.cookie("XSRF-Token", req.csrfToken())
    return res.json(spot)
}))

module.exports = router
