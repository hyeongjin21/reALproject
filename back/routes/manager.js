const express = require('express')
const router = express.Router()
const queries = require('./queries')
const conn = require('../config/database')

router.get('/',(req,res)=>{
    let userSearch = req.query.userSearch
    console.log(userSearch)
    if(userSearch == ''){
        conn.query(queries.userAll,(err, rows)=>{
            if(rows.length > 0){
                res.render('admin1_userpage',{list:rows})
            }
        })
    }
    // else{
    //     userSearch = "%" + userSearch + "%"
    //     conn.query(queries.userNameSearch,[userSearch],(err, rows)=>{
    //         if(rows.length > 0){
    //             res.render('admin1_userpage',{list:rows})
    //         }       
    //     })
    // }
})

module.exports = router;