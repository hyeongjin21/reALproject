const express = require('express')
const router = express.Router()

// 메인 페이지 이동
router.get('/',(req,res)=>{
    res.render('index')
})

// 로그인 페이지 이동
router.get('/login',(req,res)=>{
    res.render('login')
})

// 회원 가입 선택 페이지 이동
router.get('/join_choice',(req,res)=>{
    res.render('join_choice')
})

// 회원 가입(일반) 페이지 이동
router.get('/join',(req,res)=>{
    res.render('join')
})

// 회원 가입(기업) 페이지 이동
router.get('/join_com',(req,res)=>{
    res.render('join_com')
})

// 메뉴 검색 페이지 이동
router.get('/search',(req,res)=>{
    res.render('search')
})

// 쿠폰 페이지 이동
router.get('/coupon',(req,res)=>{
    res.render('coupon')
})

// 마이 페이지 이동
router.get('/mypage',(req,res)=>{
    res.render('mypage')
})

// 관리용 페이지 이동
router.get('/manager',(req,res)=>{
    res.render('manager')
})

module.exports = router;