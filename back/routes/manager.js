const express = require('express')
const router = express.Router();
const queries = require('./queries')
const conn = require('../config/database')


// 회원관리 - 사용자 라우터
router.get('/',(req,res)=>{
    let userSearch = "%" + req.query.userSearch + "%"
    if(userSearch == ''){
        conn.query(queries.userAll,[],(err, rows)=>{
            if(rows.length > 0){
                res.render('admin1_userpage',{list:rows})
            }
        })
    }else{
        conn.query(queries.userNameSearch,[userSearch],(err, rows)=>{
            if(rows.length > 0){
                res.render('admin1_userpage',{list:rows})
            }       
        })
    }
})

// 회원관리 - 등록가게 라우터
// router.get('/admin2_S_userpage',(req,res)=>{
//     console.log(req.query)
//     let shopSearch = "%" + req.query.shopSearch + "%"
//     if(shopSearch == ''){
//         conn.query(queries.shopAll,[],(err, rows)=>{
//             if(rows.length > 0){
//                 res.render('admin2_S_userpage',{list:rows})
//             }
//         })
//     }else{
//         conn.query(queries.shopNameSearch,[shopSearch],(err, rows)=>{
//             if(rows.length > 0){
//                 res.render('admin2_S_userpage',{list:rows})
//             }       
//         })
//     }
// })





module.exports = router;