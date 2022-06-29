const { Router } = require('express')

const router = Router()

const commonController = require('./controllers/commonController')

router.get('/register', commonController.getRegisterPage)
router.get('/login', commonController.getLoginPage)
router.get('/profile', commonController.getProfilePage)
router.get('/admin', commonController.getAdminPage)
router.get('/admin/createProd', commonController.getAdminCreatePage)

router.get('/', commonController.getIndex)

module.exports = router