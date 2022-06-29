const Product = require('../../models/Product')
class adminController {

    async createProduct(req, res) {
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
    }

}

module.exports = new adminController()