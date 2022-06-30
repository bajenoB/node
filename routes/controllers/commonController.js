const config = require('config')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const Product = require('../../models/Product')

const secret = config.get('jwtSecret') || 3000

class commonController 
{
    async getRegisterPage(req, res) {
        
            res.render('regist', {
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
            title: 'ddaudio',
            products
        })
    }
    async getProfilePage(req, res) {
        const token = req.cookies.session_id

        if (token) {
            const decodedData = jwt.verify(token, secret)
            let nickname = decodedData.login

            let login = decodedData.login
            const usercheck = await User.findOne({ login })

            if (usercheck) {
                const required_role = "ADMIN"

                let hasAccess = false
                usercheck.role.forEach(x => {
                    if (required_role == x) {
                        hasAccess = true
                    }
                })

                if (hasAccess) {
                    res.render('profile', {
                        title: 'Ddaudio',
                        login,
                        usercheck
                    })
                }
                else {
                    res.render('profile', {
                        title: 'Ddaudio',
                        login
                    })
                }
            }
            else {
                res.render('profile', {
                    title: 'Ddaudio',
                    login
                })
            }
        }
        else res.redirect('/login')
    }
    async getAdminPage(req, res) {
        try {
            const token = req.cookies.session_id

            const decodedData = jwt.verify(token, secret)
            let login = decodedData.login

            let role=decodedData.root

            const usercheck = await User.findOne({ login })

            if (usercheck) {
                const required_role = "ADMIN"

                let hasAccess = false
                
                    if (required_role == role) 
                    {
                        hasAccess = true
                    }
                

                if (hasAccess) {
                    res.render('admin', {
                        title: 'Adminpanel'
                    })
                }
                else {
                    res.redirect('/')
                }
            }
            else {
                res.redirect('/')
            }
        }
        catch (error) {
            console.log(error)
            res.redirect('/')
        }
    }   

}

module.exports = new commonController()