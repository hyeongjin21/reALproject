const express = require('express')
const router = express.Router()

// 쿼리문 정리해놓은 파일, 경로바뀔수있음
const queries = require('./queries')
const conn = require('../config/database')


// 회원 가입
router.post('/join', (req, res) => {
    let { name, id, pw, pw2, tel, nick } = req.body
    if(name == '' || id == ''||pw ==''||tel==''||nick=='')
    {
        res.send('<script>alert("빈칸을 입력해주세요");</script>')
        res.redirect('/join_user')
    }
    else{
        if (pw == pw2) {
            conn.query(queries.joinUser, [id, pw, name, nick, tel], (err, rows) => {
                console.log(rows)
                if (rows.affectedRows > 0) {
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
    }


})

// 로그인
router.post('/login', (req, res) => {
    console.log(req.body)
    let { id, pw } = req.body
    conn.query(queries.searchId, [id, pw], (err, rows) => {
        if (rows.length > 0) {
            req.session.user = rows[0]
            res.send(`<script>alert('어서오세요~ ${req.session.user.user_name}님');location.href='http://localhost:3333';</script>`)
        }
        else {
            res.send('<script>alert("로그인에 실패했습니다.");location.href="http://localhost:3333/login";</script>')
        }
    })
})

// 아이디 확인
router.post('/checkId', (req, res) => {
    let id = req.body.input
    let check = 0;
    conn.query(queries.selectID, [id], (err, rows) => {
        if (rows.length > 0) {
            check = 1
            res.json({ check: 1 })
        }
        else {
            check = 2
            res.json({ check: 2 })
        }
        req.session.check = check
    })
})


// 로그아웃
router.get('/logout', (req, res) => {
    // req.session.user = ''
    req.session.destroy();
    res.send(`
    <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>  
    <script>
    Kakao.init('c1b7cc23c48477786fcb69b68f5862e5');
    if (Kakao.Auth.getAccessToken()) {
        Kakao.API.request({
            url: '/v1/user/unlink',
            success: function (response) {
                console.log(response)
            },
            fail: function (error) {
                console.log(error)
            },
        })
        Kakao.Auth.setAccessToken(undefined)
    }
    </script>
    <script>alert("로그아웃");location.href="http://localhost:3333/"</script>
    `)
})

module.exports = router;