const {Router} = require('express')
const router=Router()
router.get('/',async(req,res)=>
{
    res.render('index',{
        title: 'toliksite'
    })
})
router.get('/admin',async(req,res)=>
{
    res.render('admin',{
        title: 'adminsite'
    })
})
module.exports = router