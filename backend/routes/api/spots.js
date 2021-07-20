const express = require("express")
const asyncHandler = require("express-async-handler")


const {Spot} = require ("../../db/models")
const {Image} = require ("../../db/models")

const router = express.Router()

router.get('/', asyncHandler(async(req,res) => {
    const spots = await Spot.findAll({
        include: Image
    })
    return res.json(spots)
}))

module.exports = router
