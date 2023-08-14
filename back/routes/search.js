const express = require('express')
const router = express.Router()
const queries = require('./queries')
const conn = require('../config/database')

router.get('/', (req, res) => {
    let category = req.query.category
    let searchCategory = req.query.category
    let menu = "%" + req.query.inputmenu + "%"

    if (category == 'all') {
        conn.query(queries.searchMenu, [menu], (err, rows) => {
            if (rows.length > 0) {
                // res.json({menu:rows})
                res.render('search', { list: rows })
            }
            else {
                res.render('search')
            }
        })
    }
    else {
        conn.query(queries.searchMenuCategory, [menu, searchCategory], (err, rows) => {
            if (rows.length > 0) {
                // res.json({menu:rows})
                res.render('search', { list: rows })
            }
            else {
                res.render('search')
            }
        })
    }
})

router.get('/get-coordinate', (req, res) => {
    conn.query(queries.selectLocationAll, (err, rows) => {
        if (rows.length > 0) {
            res.json({ result: rows })
        }
    })
})

router.get('/getMenu', (req, res) => {
    // console.log('getMenu called')
    // console.log('search.getmenu req:', req.query)
    let getCategory = req.query.category
    let searchCategory = req.query.category
    let getMenu = req.query.inputmenu
    console.log('routercategory:', getCategory)
    console.log('routermenu:', getMenu)
    if (getMenu == undefined) {
        conn.query(queries.menuInfoAll, (err, rows) => {
            if (rows.length > 0) {
                console.log('getMenu = undefined')
                // res.render('search', { list: rows })
                res.json({ list: rows })
            }
        })
    } else {
        getMenu = "%" + getMenu + "%";
        if (getCategory == 'all') {
            conn.query(queries.searchMenu, [getMenu], (err, rows) => {
                console.log('검색왔다')
                if (rows.length > 0) {
                    // console.log('query.rows', rows[0].shop_name)
                    console.log('보낸다')
                    res.json({ list: rows })
                    // res.render('search')
                }
                else {
                    res.render('search')
                }
                // res.render('search')
            })
        }
        else {
            conn.query(queries.searchMenuCategory, [getMenu, searchCategory], (err, rows) => {
                if (rows.length > 0) {
                    res.json({ list: rows })
                    // res.render('search')
                }
                else {
                    res.render('search')
                }
                // res.render('search')
            })
        }
        // res.json({ category : getCategory , menu : getMenu})
    }
})

//DB에서 리뷰 가져오기
router.post('/review', (req, res) => {
    let menuseq = req.body.menuseq
    let shopseq = req.body.shopseq
    // console.log(menuseq)
    // console.log('userid',req.session.user.user_id)
    let userid = req.session.user.user_id
    let shopLikeCheck = 0
    conn.query(queries.shopLikeSearch, [userid], (err, rows) => {
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].shop_seq === shopseq) {
                shopLikeCheck = 1
                break;
            }else{
                shopLikeCheck = 0
            }
        }
        console.log('rows',rows.length)
        if(rows.length == 0){
            conn.query(queries.shopInsertLike,[userid,shopseq],(err,rows)=>{
                console.log('첫 좋아요 쿼리 실행')
            })
        }
        conn.query(queries.getMenuReview, [menuseq], (err, r) => {
            res.json({ result: r, shopLikeCheck: shopLikeCheck })
        })
    })
})

//DB에 리뷰 등록하기
//addReview,(menu_seq,review_content,user_id)
router.post('/inputreview', (req, res) => {
    console.log('req :', req.body)
    console.log('name :', req.session)
    let menuseq = req.body.menuseq;
    let review = req.body.review;
    let userid = req.session.user.user_id;
    let islogin = false
    if (req.session.user.user_name == '') {
        console.log('로그인해')
        islogin = false;
        res.json({ login: islogin })
        // res.send(`<script>alert('로그인 후 사용 할 수 있습니다!');location.href='http://localhost:3333/login';</script>`)
    } else {
        // console.log('로그인했음')
        conn.query(queries.addReview, [menuseq, review, userid], (err, rows) => {
            console.log('리뷰쿼리 작동함', rows)
            // res.render('search')
            islogin = true
            res.json({ login: islogin, menu_seq: menuseq })
        })
    }
})

//가게 좋아요
router.get('/shoplike', (req, res) => {
    console.log("{shoplike-shopseq :}",req.query.shop_seq)
    console.log('req:',req.session.user.user_id)
    let userId = req.session.user.user_id
    let shopseq = req.query.shop_seq
    let likecheck = req.query.likeCheck
    let shopLike = ''
    // console.log('likecheck',req.query.likeCheck)
    if(likecheck == 0){
        shopLike = 'N'
        conn.query(queries.shopLike,[shopLike,userId,shopseq],(err,rows)=>{
            console.log('좋아요 지우기')
        })
    }else{
        shopLike = 'Y'
        conn.query(queries.shopLike, [shopLike,userId, shopseq], (err, rows) => {
            console.log('좋아요 추가')
        })
    }
})

module.exports = router; 