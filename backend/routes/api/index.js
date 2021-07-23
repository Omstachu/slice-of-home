const router = require('express').Router()
const sessionRouter = require('./session')
const usersRouter = require('./users')
const spotsRouter = require('./spots')
const imagesRouter = reqiuire('./images')
const asyncHandler = require('express-async-handler')

router.use('/session', sessionRouter)
router.use('/users', usersRouter)
router.use('/spots', spotsRouter)
router.use('/images', imagesRouter)



module.exports = router


// ? Code for testing user auth middleware routes
// const {User} = require('../../db/models')
// const {setTokenCookie} = require('../../utils/auth')
// const {restoreUser} = require('../../utils/auth')
// const {requireAuth} = require('../../utils/auth')

// router.get('/require-auth', requireAuth, (req,res) => {
//     return res.json(req.user)
// })

// router.get('/restore-user', restoreUser, (req,res) => {
//     return res.json(req.user)
// })

// router.get('/set-token-cookie', asyncHandler(async (req,res)=>{
//     const user = await User.findOne({
//         where: {
//             username: 'demo'
//         },
//     })
//     setTokenCookie(res, user);
//     return res.json({user})
// }))

// router.post('/test', (req, res) =>{
//     return res.json({requestBody: req.body})
// })
