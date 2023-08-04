const express = require('express')
const router = express.Router()

// 쿼리문 정리해놓은 파일, 경로바뀔수있음
const queries = require('./queries')
const conn = require('../config/database')


// 회원 가입
router.post('/join', (req, res) => {
    let { name, id, pw, pw2, tel,nick } = req.body
    let time = ''
    if (pw == pw2) {
        conn.query(queries.joinUser, [id, pw, name,nick, tel,time], (err, rows) => {
            if (rows) {
                res.send(`<script>alert("환영합니다.${name}님!");location.href='http://localhost:3333'</script>`)
            }
            else {
                res.send('<script>alert("회원가입에 실패하였습니다.");location.href="http://localhost:3333/join_user"</script>')
            }
        })
    }
    else {
        res.send('<script>alert("비밀번호가 다릅니다.");location.href="http://localhost:3333/join_user"</script>')
    }
})

// 로그인
router.post('/login', (req, res) => {
    let {id,pw} = req.body
    conn.query(queries.searchId,[id,pw],(err,rows)=>{
        if(rows.length > 0){
            req.session.user = rows[0]
            res.send(`<script>alert('어서오세요~ ${req.session.user.id}님');location.href='http://localhost:3333';</script>`)
        }
        else{
            res.send('<script>alert("로그인에 실패했습니다.");location.href="http://localhost:3333/login";</script>')
        }
    })
})

// 로그아웃
router.get('/logout', (req, res) => {
    // id로 받을건지 다른걸로 받을건지 정해야함
    req.session.id = ''

    // 로그아웃하면 어디로 보낼것인가?
    res.send('<script>localhost.href="http://localhost:3333/"</script>')
})

module.exports = router;