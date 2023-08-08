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









module.exports = router;