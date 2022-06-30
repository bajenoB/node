const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { validationResult } = require('express-validator')
const { jwtSecret } = require('config')

const generateToken = (id, login, root) => {
    const payload = {
        id,
        login,
        root,
    }

    return jwt.sign(payload, jwtSecret, {expiresIn: "12h"})
}

class authController {
    async reg(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                res.status(400).json({ message: "Registration errors found", errors })
            }

            const { login, password } = req.body
            const usercheck = await User.findOne({ login })

            if (usercheck) {
                return res.status(400).json({ message: 'User has been already created' })
            }

            

            const hashPass = bcrypt.hashSync(password, 6)
            
            const user = new User({ login, password: hashPass, root: "USER" })

            await user.save()

            // return res.json({ message: "User has been successfully created" })

            res.redirect('/')


        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'Registration error' })
        }
    }

    async login(req, res) {
        try {
            const { login, password } = req.body
            const user = await User.findOne({ login })

            if (user) {
                const IsPassMatches = bcrypt.compare(password, user.password)
                if (!IsPassMatches) {
                    return res.redirect('/login')
                    // return res.status(400).json({ message: 'User\'s password or login isn\'t correct' })
                }
            }
            else {
                return res.redirect('/login')
                // return res.status(400).json({ message: 'User\'s password or login isn\'t correct' })
            }

            const token = generateToken(user._id, user.login, user.root)
            res.cookie('session_id', token)
            console.log(token)

            return res.redirect('/')
            // return res.json({token})
        } catch (error) {
            console.log(error)
            return res.redirect('/login')
            // res.status(400).json({ message: 'Login error' })
        }
    }

    async logout(req, res) {
        try {
            res.clearCookie("session_id")
            return res.redirect('/login')
        } catch (error) {
            return res.redirect('/profile')
            // res.status(400).json({ message: 'Login error' })
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find().lean()
            res.json(users)
        } catch (error) {

        }
    }
}

module.exports = new authController()