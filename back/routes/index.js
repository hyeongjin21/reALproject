const express = require('express')
const router = express.Router()

// 메인 페이지 이동
router.get('/',(req,res)=>{
    console.log(req.query.nick)
    req.session.user.user_name = req.query.nick
    console.log(req.session.user.user_name)
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

// 관리용 페이지 이동
router.get('/manager',(req,res)=>{
    res.render('manager')
})

// 테스트용
router.get('/test',(req,res)=>{
    res.render('test')
})

module.exports = router;