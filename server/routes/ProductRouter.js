const ensureAuthenticated = require("../Middleware/Auth");


const router = require("express").Router();



router.get("/",ensureAuthenticated,(req,res)=>{
    res.json([
        {
            name:'mobile',
            price:1000
        }
    ])
})

module.exports = router;