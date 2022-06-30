const { Router } = require('express')
const Product = require('../models/Product')
const router = Router()
const {check} = require('express-validator')

const commonController = require('./controllers/commonController')
const authcontroller = require('./controllers/authController')
const AuthMiddleWare = require('../ware/authware')

router.get('/regist', commonController.getRegisterPage)
router.get('/login', commonController.getLoginPage)
router.get('/profile', commonController.getProfilePage)


router.get('/', commonController.getIndex)
router.post('/registUser', [
    check('login', "Username must be great than 5 or less than 15").isLength({min:5, max: 15}),
    check('password', "Password must be great than 5 or less than 20").isLength({min:5, max: 20})
], authcontroller.reg)

router.post('/login', authcontroller.login)
router.post('/logout', authcontroller.logout)
router.get('/admin', commonController.getAdminPage)



router.get('/adminCreate',async(req, res)=>{
    res.render('adminCreate', {title: 'Admin Page'})
})

router.get('/users', AuthMiddleWare, authcontroller.getUsers)

router.post('/createproduct',async(req, res)=>{
    const product= new Product({
        Name: req.body.Name,
        Price: req.body.Price,
        Image: req.body.Image,
        Manufakturer: req.body.Manufakturer,
        Country: req.body.Country,
        Rating: req.body.Rating,
        Tuning: req.body.Tuning
        
    })
    await product.save()
    res.redirect('/')
})

module.exports = router