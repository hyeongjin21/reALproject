const express = require('express')
const router = express.Router();
const queries = require('./queries')
const conn = require('../config/database')




// 관리자 로그인
// 로그인
router.post('/admin_login', (req, res) => {
    let { id, pw } = req.body
    conn.query(queries.adminLogin, [id, pw], (err, rows) => {
        console.log("{adminLoginTest : }",rows)
        if (rows.length > 0) {
            req.session.admin = rows[0]
            res.send(`<script>alert('어서오세요~ ${req.session.admin.admin_memo}님');location.href='http://localhost:3333/admin1_userpage';</script>`)
        }
        else {
            res.send('<script>alert("로그인에 실패했습니다.");location.href="http://localhost:3333/admin_login";</script>')
        }
    })  
})


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

// 회원관리 - 사용자 삭제
router.post('/userDelete', (req, res) => {
    let deleteId = req.body.seq
    console.log(deleteId)

    conn.query(queries.userDelete,[deleteId],(err, rows)=>{
        // console.log(rows)
        res.send(`<script>alert("삭제되었습니다.");</script>`)
    })

})



// 회원관리 - 등록가게 라우터
router.get('/admin2_S_userpage',(req,res)=>{
    let shopSearch = "%" + req.query.shopSearch + "%"
    // console.log(shopSearch)
    
    if(shopSearch == ''){
        conn.query(queries.shopAll,[],(err, rows)=>{
            if(rows.length > 0){
                console.log("tlqkfshadk : ",rows)
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

// 회원관리 - 가게 삭제
router.post('/shopDelete', (req, res) => {
    let deleteshop = req.body.seq
    // console.log(deleteshop)

    conn.query(queries.shopDelete,[deleteshop],(err, rows)=>{
        // console.log(rows)
        res.send(`<script>alert("삭제되었습니다.");</script>`)
    })
})


// 카페관리 - 가게 - 메뉴 삭제
router.post('/menuDelete', (req, res) => {
    let deleteMenu = req.body.seq
    console.log("deleteMenu",deleteMenu)

    conn.query(queries.menuDelete,[deleteMenu],(err, rows)=>{
        console.log(rows)
        res.send(`<script>alert("삭제되었습니다.");</script>`)
    })
})


// 카페관리 - 메뉴 수정


// 카페관리 - 가게 등록
router.post('/shopRegister', (req, res) => {
    let { shopname, bno, addr1, addr2, tel, ownername} = req.body

    if(shopname == '' || bno == ''|| addr1 =='' || tel == '' || ownername == '')
    {
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

// 회원관리 - 메뉴 삭제
router.post('/menuDelete', (req, res) => {
    let deleteMenu = req.body.seq
    console.log("deleteMenu",deleteMenu)

    conn.query(queries.menuDelete,[deleteMenu],(err, rows)=>{
        console.log(rows)
        res.send(`<script>alert("삭제되었습니다.");</script>`)
    })
})


// 카페관리 - 리뷰관리
router.get('/reviewSearch', (req, res) => {
    let category = req.query.category
    let review = "%" + req.query.review + "%"

    // 검색
    if(category == 'all' ){
        conn.query(queries.reviewAll,[],(err, rows)=>{
            // console.log(rows)
            if(rows.length > 0){
                res.render('admin8_review_manage',{list:rows})
            }
        }) 
    }else if(category == 'user'){
        conn.query(queries.reviewSearchUser,[review],(err, rows)=>{
            // console.log(rows)
            if(rows.length > 0){
                res.render('admin8_review_manage',{list:rows})
            }
        })    
    }else{
        conn.query(queries.reviewSearchContent,[review],(err, rows)=>{
            if(rows.length > 0){
                res.render('admin8_review_manage',{list:rows})
            }
        })   
    }
})    


// 리뷰관리 - 삭제
router.post('/reviewDelete', (req, res) => {
    let deleteSeq = req.body.seq
    // console.log(deleteSeq)

    conn.query(queries.reviewDelete,[deleteSeq],(err, rows)=>{
        // console.log(rows)
        res.send(`<script>alert("삭제되었습니다.");</script>`)
    })

})


















module.exports = router;