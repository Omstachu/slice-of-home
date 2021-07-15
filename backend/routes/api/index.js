const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const {User} = require('../../db/models')

// ? Code for testing user auth middleware routes
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

module.exports = router
