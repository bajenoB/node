const {Router} = require('express')
const router=Router()
router.get('/',async(req,res)=>
{
    res.render('index',{
        title: 'toliksite'
    })
})
module.exports = router