const {Router} = require('express')

const router = Router();



router.get('/', (req, res)=>{
    res.render('index')
}) 
 
router.post('/uploaded',(req,res) =>{
    console.log(req.file)
    res.render('uploaded')
})


module.exports = router;