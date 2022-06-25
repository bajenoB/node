const {Router} = require('express')
const router=Router()
const Product=require('../models/Product')
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


module.exports = router