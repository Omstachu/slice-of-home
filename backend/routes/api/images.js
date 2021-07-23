const express = require("express")
const asyncHandler = require("express-async-handler")


const {Spot} = require ("../../db/models")
const {Image} = require ("../../db/models")

const router = express.Router()


router.post('/', asyncHandler(async(req,res)=>{
    const image = await Image.create(req.body)
    return res.json(image)
}))


module.exports = router
