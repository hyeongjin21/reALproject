const express = require('express')
const router = express.Router();
const queries = require('./queries')
const conn = require('../config/database')


// 회원관리 - 사용자 라우터
router.get('/',(req,res)=>{
    let userSearch = "%" + req.query.userSearch + "%"
    console.log(userSearch)
    if(userSearch == ''){
        conn.query(queries.userAll,(err, rows)=>{
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
router.get('/admin2_S_userpage',(req,res)=>{
    let shopSearch = req.query.shopSearch
    // console.log(shopSearch)
    
    if(shopSearch == ''){
        conn.query(queries.shopAll,[],(err, rows)=>{
            if(rows.length > 0){
                res.render('admin2_S_userpage',{list:rows})
            }
        })
    }else{
        conn.query(queries.shopNameSearch,[shopSearch],(err, rows)=>{
            if(rows.length > 0){
                res.render('admin2_S_userpage',{list:rows})
            }       
        })
    }
})


// 카페관리 - 가게정보수정

// 카페관리 - 메뉴 등록

// 카페관리 - 메뉴 수정


// 카페관리 - 카페 등록
router.post('/shop_register', (req, res) => {
    let { shopname, bno, addr1, addr2, tel, ownername } = req.body

    if(shopname == '' || bno == ''|| addr1 =='' || tel == '' || ownername == '')
    {
        // console.log("12312312");
        res.send(`<script>
        alert("빈칸을 빠짐없이 입력해주세요");
        location.href='http://localhost:3333/admin6_shop_register'
        </script>`)
        // res.render('/admin6_shop_register')
    }else{
        conn.query(queries.insertShop, [shopname, bno, addr1, addr2, tel, ownername], (err, rows)=>{
        res.send(`<script>alert("${shopname} 카페가 등록되었습니다.");location.href='http://localhost:3333/admin2_S_userpage'</script>`)
        })
    }


})







module.exports = router;