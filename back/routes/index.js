const express = require('express')
const router = express.Router()
const queries = require('./queries')
const conn = require('../config/database')
const multer = require('multer')

/////////////////////////  user 페이지  //////////////////////////////
// 메인 페이지 이동
router.get('/',(req,res)=>{
    console.log('kakao user_name:',req.query.user_name)
    if(req.query.user_name != undefined){
        req.session.user.user_name = req.query.user_name
    }
    // console.log('session :',req.session.user.user_name)
    if(req.session.user === undefined){
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





/////////////////////////////관리자페이지/////////////////////////////////

// 회원관리 - 사용자 페이지로 이동
router.get('/admin1_userpage',(req,res)=>{
    const userSearch = queries.userAll
    conn.query(userSearch,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.render('admin1_userpage', {list : result})
        }
    })
})



// 회원관리 - 사용자 삭제
router.post('/admin1_userpage',(req,res)=>{
    res.render('admin1_userpage')
})

// 회원관리 - 등록가게 페이지로 이동
router.get('/admin2_S_userpage',(req,res)=>{
    const shopInfo = queries.shopAll
    conn.query(shopInfo,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.render('admin2_S_userpage', {list : result})
        }
    })
})

// 회원관리 - 가게 수정버튼 -> 수정페이지로 이동
router.post('/shopModify',(req,res)=>{
    res.render('shopModify')
})

// 카페관리 - 가게 정보 수정 페이지로 이동
router.get('/admin3_S_info',(req,res)=>{
   // res.render('admin3_S_info')
    const menuInfo = queries.shopMenu
    console.log("reqqury:", req.query)
    conn.query(menuInfo,[req.query.shop_seq],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log("result : ",result)
            res.render('admin3_S_info', {
                list : result,
                name : req.query.shop_name,
                shop_seq : req.query.shop_seq
            })
        }
    })
})

// 회원관리 - 사용자 삭제
router.post('/admin2_S_userpage',(req,res)=>{
    res.render('admin2_S_userpage')
})

// 카페관리 - 가게 세부 메뉴 페이지로 이동
router.get('/admin3_S_info',(req,res)=>{
    res.render('admin3_S_info')
})

// 카페관리 - 가게 수정페이지 이동
router.get('/shopinfo_modify',(req,res)=>{
    console.log("modify : ",req.query.shop_seq)
    conn.query(queries.selectShop, [req.query.shop_seq], (err, rows)=>{
    console.log("rows :", rows);
    res.render('shopinfo_modify',{ 
        cols : rows[0],
        shop_seq : req.query.shop_seq
    })
    })

})

// 카페관리 - 가게 메뉴 등록 페이지로 이동
router.get('/admin4_menu_register',(req,res)=>{
    console.log(req.query)
    res.render('admin4_menu_register')
})

// 카페관리 - 가게 메뉴 수정 페이지로 이동
router.get('/admin5_menu_modify',(req,res)=>{
    const menuInfo = queries.menuInfo
    console.log("reqqury:", req.query)
    conn.query(menuInfo,[req.query.menu_seq],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log("result : ",result)        
            res.render('admin5_menu_modify',{ 
                cols : result[0],
                shop_name : req.query.shop_name,
                shop_seq : req.query.shop_seq
                
            })
            }
        })
    })


// 카페관리 - 신규 가게 등록 페이지로 이동
router.get('/admin6_shop_register',(req,res)=>{
    res.render('admin6_shop_register')
})

// 카페관리 - 위치정보관리 페이지로 이동
router.get('/admin7_location_manage',(req,res)=>{
    res.render('admin7_location_manage')
})

// 카페관리 - 리뷰관리 페이지로 이동
router.get('/admin8_review_manage',(req,res)=>{
    const reviewInfo = queries.reviewAll
    conn.query(reviewInfo,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.render('admin8_review_manage', {list : result})
        }
    })
    })



// 카페관리 - 삭제
router.post('/admin8_review_manage',(req,res)=>{
    res.render('admin8_review_manage')
})

// 이미지파일경로 설정
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../public/asset/img/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.' + file.mimetype.split('/')[1])
    }
});

const upload = multer({ storage: storage });

// 이미지 저장
router.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file);
    if (req.file) {
      res.json({ imageUrl: `../public/asset/img/${req.file.filename}` });
    } else {
      res.status(400).send('Error uploading file.');
    }
  });





/////////////////////////  mypage 페이지  //////////////////////////////

// mypage 
router.get('/mypage',(req,res)=>{
    // res.render('mypage')
    const currentUser = req.session
    const myShop = queries.myShop
    if(currentUser != undefined){
    conn.query(myShop,[currentUser.user.user_id],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            
            res.render('mypage', {
                list : result,
                user_id : currentUser.user.user_id,
            })}
        }
    )} else {
        res.render('mypage')
    }
})















module.exports = router;