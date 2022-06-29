const Product = require('../models/Product')

class Controller {
    async getRegisterPage(req, res) {
        res.render('register', {
            title: 'Register',
            IsLogin: true
        })
    }

    async getLoginPage(req, res) {
        res.render('login', {
            title: 'Auth',
            IsLogin: true
        })
    }

    async getIndex(req, res) {
        const products = await Product.find({}).lean()

        res.render('index', {
            title: 'Лучший магазин семян марихуаны Coffeeshop.ua в Украине.',
            IsStore: true,
            products
        })
    }

    async getProductById(req, res) {
        const { productId } = req.params
        var product = await Product.findById(productId).lean()

        res.render('product', {
            title: product.Title,
            IsLogin: true,
            product
        })
    }
}

module.exports = new Controller()