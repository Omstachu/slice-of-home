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
    const image = await Image.create({spotId: spot.dataValues.id, url: req.body.url})
    return res.json(spot)
}))

router.get('/:id', asyncHandler(async(req,res) => {
    const id = req.params.id
    const spots = await Spot.findByPk(id, {
        include: Image,

    })
    return res.json(spots)
}))

router.put('/:id', asyncHandler(async(req,res) => {
    const id = req.params.id

    // console.log(req.params)
    const spot = await Spot.findByPk(id, {
        include: Image
    })

    // const image = await Image.findOne({
    //     where: {spotId: id}
    // })
    // console.log(req.body)
    await spot.update(req.body, {
        where: {id},
        returning: true,
        plain: true,
    })

    // await image.update(req.body.url,{
    //     where: {spotId: id},
    //     returning:true,
    //     plain: true,
    // })

    // console.log('are we good')


    return res.json(spot)
}))

router.delete('/:id', asyncHandler(async(req,res) =>{
    const id = req.params.id
    // console.log(id)
    const spot = await Spot.findByPk(id)
    const images = await Image.findAll({
        where: {spotId: id}
    })
    console.log(images)
    images.map(image => {
        image.destroy()
    })
    spot.destroy()

    return res.json(spot)
}))

module.exports = router
