const {Router} = require('express')
const router=Router()
const Product=require('../models/Product')
const User = require('../models/User')

const Controller = require('./Controller')

router.get('/register', Controller.getRegisterPage)
router.get('/login', Controller.getLoginPage)

router.get('/', Controller.getIndex)
router.get('/product/:productId', Controller.getProductById)

router.get('/',async(req,res)=>
{
    const products=await Product.find({}).lean()

    res.render('index',{
        title: 'toliksite',
        products
    })
})
router.get('/admin',async(req,res)=>
{
    res.render('admin',{
        title: 'adminsite'
    })
    if (adminroot = false) {
        res.redirect('/')
    }
})

router.post('/createProd',async(req,res)=>
{
    const product= new Product({
        Name: req.body.Name,
        Price: req.body.Price,
        Image: req.body.Image,
        Manufakturer: req.body.Manufakturer,
        Country: req.body.Country,
        Rating: req.body.Rating
        
    })
    await product.save()
    res.redirect('/')
})

router.get('/product/:productid', async (req, res) => {
    var product = await Product.findById(req.params.productid).lean()

    console.log(product)

    res.render('product', {
        title: product.Title,
        IsLogin: true,
        product
    })
})






module.exports = router