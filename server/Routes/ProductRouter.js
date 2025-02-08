const ensureAuthenticated = require('../Middlewares/Auth');

const router = require('express').Router();

router.get('/',ensureAuthenticated,(req,res)=>{
    res.status(200).json([
        {
            name : 'Ali',
            value: 10000
        },
        {
            name: 'Daud',
            value: 20000
        }
    ])
})

module.exports = router