const { Router } = require('express')
const config = require('config')
const router = Router()
const authcontroller = require('./controllers/authController')
const {check} = require('express-validator')

const AuthMiddleWare = require('../ware/authware')

router.post('/registUser', [
    check('login', "Username must be great than 5 or less than 15").isLength({min:5, max: 15}),
    check('password', "Password must be great than 5 or less than 20").isLength({min:5, max: 20})
], authcontroller.reg)

router.post('/login', authcontroller.login)
router.post('/logout', authcontroller.logout)

router.get('/users', AuthMiddleWare, authcontroller.getUsers)

module.exports = router