const express = require('express')
const router = express.Router()

// 쿼리문 정리해놓은 파일, 경로바뀔수있음
const queries = require('./queries')
const conn = require('../config/database')

//console.log('test :'+ conn.query(queries.printData))
// conn.query(queries.printData,(err,rows)=>{
//     console.log('text1: '+ queries.printData);
// })


// 데이터확인용
router.post('/test',(req,res)=>{
    console.log('ok')
    conn.query(queries.printData,(err,rows)=>{
        res.send(`<h1>${rows}</h1>`);
        console.log(rows);
    })
    // res.send(queries.printData)
})


// 회원 가입
router.post('/join',(req,res)=>{
    let {name, id, pw, pw2, phone_num} = req.body
    
    if(pw == pw2){
        
    }
})

// 로그인
router.post('/login',(req,res)=>{
    queries.selectuser
})

// 로그아웃
router.get('/logout',(req,res)=>{
    // id로 받을건지 다른걸로 받을건지 정해야함
    req.session.id = ''

    // 로그아웃하면 어디로 보낼것인가?
    res.send('<script>localhost.href="http://localhost:3333/"</script>')
})

module.exports = router;