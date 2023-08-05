const express = require('express')
const router = express.Router()
const queries = require('./queries')
const conn = require('../config/database')

router.get('/',(req,res)=>{
    let category = req.query.category
    let searchCategory = req.query.category
    let menu = "%"+req.query.inputmenu+"%"
    console.log(menu,searchCategory);
    if(category == 'all')
    {
        conn.query(queries.searchMenu,[menu],(err,rows)=>{
            console.log(rows)
            if(rows.length > 0){
                console.log('값')
                res.render('search',{list:rows})
            }
        })
    }
    else {
        conn.query(queries.searchMenuCategory,[menu,searchCategory],(err,rows)=>{
            console.log(rows)
            if(rows.length > 0){
                console.log('값')
                res.render('search',{list:rows})
            }
        })
    }
})

module.exports = router;