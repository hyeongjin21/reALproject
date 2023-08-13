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
    let deleteMenuSeq = req.body.seq
    // console.log(deleteMenuSeq)

    conn.query(queries.menuDelete,[deleteMenuSeq],(err, rows)=>{
        // console.log(rows)
        res.send(`<script>alert("삭제되었습니다.");</script>`)
    })

})


// 카페관리 - 메뉴 수정


// 카페관리 - 가게 등록
router.post('/shopRegister', (req, res) => {
    let { shopname, bno, addr1, addr2, tel, ownername, shop_img } = req.body

    if(shopname == '' || bno == ''|| addr1 =='' || tel == '' || ownername == '' || shop_img == '' )
    {
        res.send(`<script>
        alert("빈칸을 빠짐없이 입력해주세요");
        location.href='http://localhost:3333/admin6_shop_register'
        </script>`)
        // res.render('/admin6_shop_register')
    }else{
        conn.query(queries.insertShop, [shopname, bno, addr1, addr2, tel, ownername, shop_img], (err, rows)=>{
        res.send(`<script>alert("${shopname} 카페가 등록되었습니다.");location.href='http://localhost:3333/admin2_S_userpage'</script>`)
        })
    }
})

// 카페관리 - 카페 수정
router.post('/shopModify', (req, res) => {
    let { shopname, bno, addr1, addr2, tel, ownername } = req.body

    if(shopname == '' || bno == ''|| addr1 =='' || tel == '' || ownername == '')
    {
        res.send(`<script>
        alert("빈칸을 빠짐없이 입력해주세요");
        location.href='http://localhost:3333/shopInfo_Modify'
        </script>`)
        // res.render('/admin6_shop_register')
    }else{
        conn.query(queries.shopModify, [shopname, bno, addr1, addr2, tel, ownername], (err, rows)=>{
        res.send(`<script>alert("${shopname} 카페의 정보가 수정되었습니다.");location.href='http://localhost:3333/shopInfo_Modify'</script>`)
        })
    }
})

// // 카페관리 - 위치정보관리 
// router.get('/shopLocation', (req, res) => {
//     let name = "%" + req.query.shopname + "%"
//     console.log(name)

//     if(name == ''){
//         conn.query(queries.shopLocationAll,[],(err, rows)=>{
//             if(rows.length > 0){
//                 res.render('admin7_location_manage',{list:rows})
//             }
//         })
//     }else{
//         conn.query(queries.shopLocationSearch,[name],(err, rows)=>{
//             if(rows.length > 0){
//                 res.render('admin7_location_manage',{list:rows})
//             }       
//         })
//     }


//     // 삭제 기능

// })

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