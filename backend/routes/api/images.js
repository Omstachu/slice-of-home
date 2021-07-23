const express = require("express")
const asyncHandler = require("express-async-handler")


const {Spot} = require ("../../db/models")
const {Image} = require ("../../db/models")

router.post('/', asyncHandler(async(req,res)=>{
    const image = await Image.create(req.body)
    return res.json(image)
}))

const router = express.Router()

module.exports = router
