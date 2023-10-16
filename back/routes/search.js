const express = require('express')
const router = express.Router()
const queries = require('./queries')
const conn = require('../config/database')

// router.get('/search', (req, res)=>{
//     let user_id_search = req.session.user.user_id
//     res.render('search')
// })

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
            searchCategory = '%' + searchCategory + '%'
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
    let userid = ''
    if(req.session.user != undefined){
        userid = req.session.user.user_id
    }
    let shopLikeCheck = 0
    let menuLikeCheck = 0
    let isReviewCheck = []
    let reviewseq = []
    conn.query(queries.LikeSearch, [userid], (err, rows) => {
        // console.log('likesearch',rows[0])
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].shop_seq === shopseq && rows[i].shop_like_yn == "Y" ) {
                shopLikeCheck = 1
                break;
            }else{
                shopLikeCheck = 0
            }
        }
        for(let i = 0; i < rows.length; i++){
            if(rows[i].menu_seq === menuseq && rows[i].menu_like_yn =='Y'){
                menuLikeCheck = 1
                break;
            }else{
                menuLikeCheck = 0
            }
        }
        conn.query(queries.allReviewLikeSearch,[userid],(err,rows)=>{
            for(let i =0;i<rows.length;i++){
                reviewseq[i] = rows[i].review_seq
                isReviewCheck[i] = rows[i].review_like_yn
            }
            console.log('좋아요쿼리',isReviewCheck)
        })
        if(rows.length == 0 && shopLikeCheck == 0){
            conn.query(queries.shopInsertLike,[userid,shopseq],(err,rows)=>{
                console.log('첫 좋아요 쿼리 실행')
            })
        }
        if(rows.length == 0 && menuLikeCheck == 0){
            conn.query(queries.menuInsertLike,[userid,menuseq],(err,menuRows)=>{
                console.log('메뉴 처음 좋아요')
            })
        }
        conn.query(queries.getMenuReview, [menuseq], (err, r) => {
            res.json({ result: r, shopLikeCheck: shopLikeCheck , menuLikeCheck : menuLikeCheck , getReviewLike : reviewseq , getreviewlikeyn : isReviewCheck})
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
    if(req.session.user.user_id != undefined){
        let userid = req.session.user.user_id;
    }
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

//메뉴 좋아요
router.get('/menulike',(req,res)=>{
    console.log('menulikeRouter:',req.query)
    console.log('user',req.session.user)
    let userId = req.session.user.user_id
    let menuseq = req.query.menu_seq
    let likecheck = req.query.likeCheck
    let menuLike = ''
    if(likecheck == 0){
        menuLike = 'N'
        conn.query(queries.menuLike,[menuLike,userId,menuseq],(err,rows)=>{
            console.log('메뉴 좋아요 지우기')
        })
    }else{
        menuLike = 'Y'
        conn.query(queries.menuLike,[menuLike,userId,menuseq],(err,rows)=>{
            console.log('메뉴 좋아요')
        })
    }
})

router.get('/reviewlike',(req,res)=>{
    console.log('reviewlikeRouter',req.query)
    let user_id = req.session.user.user_id
    let review_seq = req.query.reviewseq
    let likecheck = req.query.reviewLike
    let reviewlike = ''
    let reviewseqlist = []
    conn.query(queries.allReviewLikeSearch,[user_id],(err,rows)=>{
        // console.log('리뷰라우터',rows[0].review_seq)
        for(let i =0;i<rows.length;i++){
            reviewseqlist[i] = rows[0].review_seq
        }
        if(likecheck == 1){
            reviewlike = 'Y'
            if(reviewseqlist.indexOf(review_seq) == -1){
                conn.query(queries.insertLikeReview,[review_seq,user_id,reviewlike],(err,rr)=>{
                    console.log('리뷰좋아요')
                })
            }
        }else{
            reviewlike = 'N'
            conn.query(queries.updateLikeReview,[reviewlike,user_id,review_seq],(err,r)=>{
                console.log('리뷰 좋아요 취소')
            })
        }
    })

})



module.exports = router; 