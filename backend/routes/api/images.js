const express = require("express")
const asyncHandler = require("express-async-handler")


const {Spot} = require ("../../db/models")
const {Image} = require ("../../db/models")

const router = express.Router()

router.get('/', asyncHandler(async(req,res)=>{
    const images = await Image.findAll({
        order: [
            ['id', 'DESC']
        ]
    })
    return res.json(images)
}))

router.post('/', asyncHandler(async(req,res)=>{
    const image = await Image.create(req.body)
    return res.json(image)
}))


module.exports = router
