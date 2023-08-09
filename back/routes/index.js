const express = require('express')
const router = express.Router()

// 메인 페이지 이동
router.get('/',(req,res)=>{
    console.log('kakao user_name:',req.query.user_name)
    if(req.query.user_name != undefined){
        req.session.user.user_name = req.query.user_name
    }
    console.log('session :',req.session.user.user_name)
    if(req.session.user.user_name == ''){
        res.render('index')
    }else{
        res.render('index',{name:req.session.user.user_name})
    }
})//

// 로그인 페이지 이동
router.get('/login',(req,res)=>{
    res.render('login')
})

// 회원 가입 페이지 이동
router.get('/join_user',(req,res)=>{
    res.render('join_user')
})


// 마이 페이지 이동
router.get('/mypage',(req,res)=>{
    res.render('mypage')
})


// 회원관리 - 사용자 페이지로 이동
router.get('/admin1_userpage',(req,res)=>{
    res.render('admin1_userpage')
})

// 회원관리 - 등록가게 페이지로 이동
router.get('/admin2_S_userpage',(req,res)=>{
    res.render('admin2_S_userpage')
})

// 카페관리 - 가게 정보 수정 페이지로 이동
router.get('/admin3_S_info',(req,res)=>{
    res.render('admin3_S_info')
})

// 카페관리 - 가게 메뉴 등록 페이지로 이동
router.get('/admin4_menu_register',(req,res)=>{
    res.render('admin4_menu_register')
})

// 카페관리 - 가게 메뉴 수정 페이지로 이동
router.get('/admin5_menu_modify',(req,res)=>{
    res.render('admin5_menu_modify')
})

// 카페관리 - 신규 가게 등록 페이지로 이동
router.get('/admin6_shop_register',(req,res)=>{
    res.render('admin6_shop_register')
})



module.exports = router;