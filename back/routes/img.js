const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const conn = require('../config/database');
const queries = require('./queries');

const router = express.Router();

fs.readdir('./public/uploads', (error) => {
    // uploads 폴더 없으면 생성
    if (error) {
        fs.mkdirSync('./public/uploads');
    }
})

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, './public/uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename("menu_img") + Date.now() + ext);
            console.log( "아아아아아아아아 :",path.basename("img") + Date.now() + ext)
        },
    }),
})

const uploads = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, './public/shop_uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename("shop_img") + Date.now() + ext);
            
        },
    }),
})

//메뉴이미지등록
// 이미지 업로드를 위한 API
// upload의 single 메서드는 하나의 이미지를 업로드할 때 사용
router.post('/upload', upload.single('menu_img'), (req, res) => {
    console.log("{ tlqkf:}",req.body)
    console.log("{ dlalkdgf:}",req.file.filename)
    conn.query(queries.insertMenu,
        [
        req.body.shop_seq, 
        req.body.menu_name, 
        req.body.price,
        req.body.info, 
        req.body.temperature, 
        req.body.option, 
        req.body.category,
        req.body.tags, 
        req.file.filename
    ],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            conn.query(queries.menuInfoAll,(e,r)=>{

                console.log()
                console.log(r)
                res.render('menu_list', {list: r})
                return;

            })
        }
    })
})

// 가게이미지 등록
router.post('/shop_register', uploads.single('shop_img'), (req, res) => {
    let { shopname, bno, addr1, addr2, tel, ownername} = req.body
    if(shopname == '' || bno == ''|| addr1 =='' || tel == '' || ownername == '')
        {
            res.send(`<script>
            alert("빈칸을 빠짐없이 입력해주세요");
            location.href='http://localhost:3333/admin6_shop_register'
            </script>`)
            // res.render('/admin6_shop_register')
        }else{
            conn.query(queries.insertShop, [shopname, bno, addr1, addr2, tel, ownername, req.file.filename], (err, rows)=>{
            res.send(`<script>alert("${shopname} 카페가 등록되었습니다.");location.href='http://localhost:3333/admin2_S_userpage'</script>`)
            })
        }
})

//가게이미지 등록수정
router.post('/shopinfo_Modify', uploads.single('shop_img'),(req, res) => {
    let { shopname, bno, addr1, addr2, tel, ownername} = req.body
    if(shopname == '' || bno == ''|| addr1 =='' || tel == '' || ownername == '')
        {
            res.send(`<script>
            alert("빈칸을 빠짐없이 입력해주세요");
            location.href='http://localhost:3333/admin6_shop_register'
            </script>`)
            // res.render('/admin6_shop_register')
        }else{
            conn.query(queries.insertShop, [shopname, bno, addr1, addr2, tel, ownername, req.file.filename], (err, rows)=>{
            res.send(`<script>alert("${shopname} 카페가 등록되었습니다.");location.href='http://localhost:3333/admin2_S_userpage'</script>`)
            })
        }
})
module.exports = router;